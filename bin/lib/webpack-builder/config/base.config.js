"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_service_1 = require("../service/webpack.service");
const config = webpack_service_1.WebpackService.getInstance().getConfiguration();
exports.baseConfiguration = {
    optimization: {
        minimize: false,
    },
    context: config.getContextPath(),
    entry: config.getEntryFile(),
    module: {
        rules: [
            {
                test: /.*\.tsx?$/,
                use: [{
                        loader: "clean-requirejs-imports.loader",
                    }, {
                        loader: "ts-loader",
                        options: {
                            configFile: config.getTsConfigFile(),
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
        modules: config.getLoaderContextPaths(),
    },
    output: {
        filename: config.getOutFileName(),
        libraryTarget: "umd",
        path: config.getOutputDirectory(),
    },
    plugins: [],
};
