import { Module, ModuleOptions } from "webpack";
import { WebpackService } from "../service/webpack.service";

const config = WebpackService.getInstance().getConfig();

const moduleRules: ModuleOptions = {
    rules: [{
        sideEffects: false,
        test: /\.js$/,
        use: [
            { loader: "clean-requirejs-imports.loader" },
            { loader: "sanitize-html-imports.loader" },
        ],
    }, {
        test: /text!.*\.html$/,
        use: [{
            loader: "raw-loader",
        }],
    }, {
        test: /.*\.html$/,
        use: [{
            loader: "raw-loader",
        }],
    }, {
        loader: "json-loader",
        test: /\.json/,
        type: "javascript/auto",
    }, {
        sideEffects: true,
        test: /.*\.tsx?$/,
        use: [
            {
                loader: "ts-loader",
                options: {
                    compilerOptions: {
                        outDir: ".",
                    },
                    configFile: config.getTsConfigFile(),
                },
            },
            { loader: "clean-requirejs-imports.loader" },
            { loader: "sanitize-html-imports.loader" },
        ],
    }, {
        sideEffects: true,
        test: /\.scss$/,
        use: [{
            loader: "style-loader",
        }, {
            loader: "css-loader",
        }, {
            loader: "sass-loader",
        }],
    }, {
        sideEffects: true,
        test: /\.less$/,
        use: [{
            loader: "style-loader",
        }, {
            loader: "css-loader",
        }, {
            loader: "less-loader",
        }],
    }, {
        sideEffects: true,
        test: /\.css$/,
        use: [{
            loader: "style-loader",
        }, {
            loader: "css-loader",
            options: {
                importLoaders: 1,
                modules: false,
            },
        }],
    }, {
        loader: "url-loader",
        options: {
            limit: 100000,
            mimetype: "application/vnd.ms-fontobject",
            name: "[name].[ext]",
            outputPath: "fonts/",
            publicPath: `${config.getOutDirectory()}/fonts`,
        },
        test: /\.eot$/,
    }, {
        loader: "url-loader",
        options: {
            limit: 100000,
            mimetype: "application/font-woff2",
            name: "[name].[ext]",
            outputPath: "fonts/",
            publicPath: `${config.getOutDirectory()}/fonts`,
        },
        test: /\.woff2$/,
    }, {
        loader: "url-loader",
        options: {
            limit: 100000,
            mimetype: "application/font-woff",
            name: "[name].[ext]",
            outputPath: "fonts",
            publicPath: `${config.getOutDirectory()}/fonts`,
        },
        test: /\.woff$/,
    }, {
        loader: "url-loader",
        options: {
            limit: 100000,
            mimetype: "application/font-ttf",
            name: "[name].[ext]",
            outputPath: "fonts",
            publicPath: `${config.getOutDirectory()}/fonts`,
        },
        test: /\.ttf$/,
    }, {
        loader: "url-loader",
        options: {
            limit: 100000,
            mimetype: "image/svg+xml",
            name: "[name].[ext]",
            outputPath: "fonts",
            publicPath: `${config.getOutDirectory()}/fonts`,
        },
        test: /\.svg$/,
    }, {
        loader: "url-loader",
        options: {
            limit: 10000
        },
        test: /\.(png|jpg|gif)$/,
    }
    , {
        test: /\.ts$/,
        loader: 'string-replace-loader',
        options: {
            search: 'umd/daVinci',
            replace: 'esm/daVinci'
        }
    }
],
};

export default moduleRules;
