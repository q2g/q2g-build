"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rh_utils_1 = require("rh-utils");
const api_1 = require("../../api");
const configService = rh_utils_1.Config.getInstance();
exports.baseConfiguration = {
    optimization: {
        minimize: false,
    },
    context: configService.get(api_1.WebpackConfigProperties.context),
    entry: configService.get(api_1.WebpackConfigProperties.entry),
    module: {
        rules: [
            {
                test: /.*\.tsx?$/,
                use: [{
                        loader: "clean-requirejs-imports.loader",
                    }, {
                        loader: "ts-loader",
                        options: {
                            configFile: configService.get(api_1.WebpackConfigProperties.tsconfig),
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
        alias: {
            css: "css-loader",
            text: "raw-loader",
        },
        mainFields: ["loader", "main"],
        modules: configService.get(api_1.WebpackConfigProperties.loaderContext),
    },
    output: {
        filename: configService.get(api_1.WebpackConfigProperties.outFile),
        libraryTarget: "umd",
        path: configService.get(api_1.WebpackConfigProperties.outDir),
    },
    plugins: []
};
