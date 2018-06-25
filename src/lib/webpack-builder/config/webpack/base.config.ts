import { resolve } from "path";
import { Config } from "rh-utils";
import { Configuration, ProvidePlugin } from "webpack";
import { WebpackConfigProperties } from "../../api";

const configService = Config.getInstance();

export const baseConfiguration: Configuration = {

    optimization: {
        minimize: false,
    },

    context: configService.get(WebpackConfigProperties.context),

    entry: configService.get(WebpackConfigProperties.entry),

    module: {
        rules: [
            {
                test: /.*\.tsx?$/,
                use: [{
                    /**
                     * remove all require js import plugins like css! or html!
                     * otherwise bundle will fail
                     */
                    loader: "clean-requirejs-imports.loader",
                }, {
                    loader: "ts-loader",
                    options: {
                        configFile: configService.get(WebpackConfigProperties.tsconfig),
                    },
                }],
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader",
                }, {
                    loader: "css-loader",
                }, {
                    loader: "less-loader",
                }],
            },
            {
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
            },
        ],
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
        modules: configService.get(WebpackConfigProperties.loaderContext),
    },

    output: {
        filename: configService.get(WebpackConfigProperties.outFile),
        libraryTarget: "umd",
        path: configService.get(WebpackConfigProperties.outDir),
    },
};
