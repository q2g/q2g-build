import { Configuration } from "webpack";
import { WebpackService } from "../service/webpack.service";

const config = WebpackService.getInstance().getConfiguration();

const webpackConfig: Configuration = {

    context: config.getContextPath(),

    entry: config.getEntryFile(),

    externals: config.getExternalModules(),

    module: {
        rules: [{
            test: /text!.*\.html$/,
            use: [{
                loader: "raw-loader",
            }],
        }, {
            test: /.*\.tsx?$/,
            use: [{
                /**
                 * remove all require js import css loader plugins
                 * otherwise bundle will fail
                 */
                loader: "clean-requirejs-imports.loader",
            }, {
                loader: "ts-loader",
                options: {
                    configFile: config.getTsConfigFile(),
                },
            }],
        }, {
            test: /\.less$/,
            use: [{
                loader: "style-loader",
            }, {
                loader: "css-loader",
            }, {
                loader: "less-loader",
            }],
        }, {
            test: /\.css$/,
            use: [{
                loader: "style-loader",
                options: {
                    convertToAbsoluteUrls: true,
                },
            }, {
                loader: "css-loader",
                options: {
                    importLoaders: 1,
                    modules: false,
                },
            }],
        }, {
            loader: "url-loader?limit=100000&mimetype=application/vnd.ms-fontobject",
            test: /\.eot$/,
        }, {
            loader: "url-loader?limit=100000&mimetype=application/font-woff2",
            test: /\.woff2$/,
        }, {
            loader: "url-loader?limit=100000&mimetype=application/font-woff",
            test: /\.woff$/,
        }, {
            loader: "url-loader?limit=100000&mimetype=application/font-woff",
            test: /\.woff$/,
        }, {
            loader: "url-loader?limit=100000&mimetype=application/font-ttf",
            test: /\.ttf$/,
        }, {
            loader: "url-loader?limit=100000&mimetype=image/svg+xml",
            test: /\.svg$/,
        }, {
            loader: "url-loader",
            options: { limit: 10000 },
            test: /\.(png|jpg|gif)$/,
        }],
    },

    resolve: {
        extensions: [".ts", ".js"],
    },

    resolveLoader: {
        /**
         * tell webpack where to find our loaders
         * otherwise it will search in the current working directory
         * which is that directory which has consumed base_loader module
         */
        alias: {
            css: "css-loader",
            text: "raw-loader",
        },
        mainFields: ["loader", "main"],
        modules: config.getLoaderContextPaths(),
    },

    output: {
        filename: config.getOutFileName(),
        libraryTarget: "umd",
        path: config.getOutputDirectory(),
    },

    plugins: config.getPlugins(),
};

export default webpackConfig;
