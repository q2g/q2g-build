"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_service_1 = require("../service/webpack.service");
const config = webpack_service_1.WebpackService.getInstance().getConfig();
const webpackConfig = {
    context: config.getProjectSource(),
    entry: config.getEntryFile(),
    externals: config.getExternalModules() || [],
    mode: config.getWebpackEnvironment(),
    optimization: config.getOptimization(),
    module: {
        rules: [{
                test: /text!.*\.html$/,
                use: [{
                        loader: "raw-loader",
                    }],
            }, {
                sideEffects: false,
                test: /\.(tsx?|js)$/,
                use: [{
                        loader: "clean-requirejs-imports.loader",
                    }],
            }, {
                sideEffects: true,
                test: /.*\.tsx?$/,
                use: [{
                        loader: "ts-loader",
                        options: {
                            compilerOptions: {
                                outDir: ".",
                            },
                            configFile: config.getTsConfigFile(),
                        },
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
        path: config.getOutDirectory(),
    },
    plugins: config.getPlugins(),
};
exports.default = webpackConfig;
