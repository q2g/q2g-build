import { Module } from "webpack";
import { WebpackService } from "../service/webpack.service";

const config = WebpackService.getInstance().getConfig();

const moduleRules: Module = {
    rules: [{
        sideEffects: false,
        test: /\.js$/,
        use: [
            { loader: "clean-requirejs-imports.loader" },
            { loader: "sanitize-html-imports.loader" },
        ],
    }, {
        test: /.*\.html$/,
        use: [
            {
                loader: "image-to-base64.loader",
            },
            {
                loader: "html-loader",
                options: {
                }
            },
        ],
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
        loader: "url-loader?limit=100000&mimetype=application/vnd.ms-fontobject",
        options: {
            name: "[name].[ext]",
            outputPath: "fonts/",
            publicPath: `${config.getOutDirectory()}/fonts`,
        },
        test: /\.eot$/,
    }, {
        loader: "url-loader?limit=100000&mimetype=application/font-woff2",
        options: {
            name: "[name].[ext]",
            outputPath: "fonts/",
            publicPath: `${config.getOutDirectory()}/fonts`,
        },
        test: /\.woff2$/,
    }, {
        loader: "url-loader?limit=100000&mimetype=application/font-woff",
        options: {
            name: "[name].[ext]",
            outputPath: "fonts",
            publicPath: `${config.getOutDirectory()}/fonts`,
        },
        test: /\.woff$/,
    }, {
        loader: "url-loader?limit=100000&mimetype=application/font-ttf",
        options: {
            name: "[name].[ext]",
            outputPath: "fonts",
            publicPath: `${config.getOutDirectory()}/fonts`,
        },
        test: /\.ttf$/,
    }, {
        loader: "url-loader?limit=100000&mimetype=image/svg+xml",
        options: {
            name: "[name].[ext]",
            outputPath: "fonts",
            publicPath: `${config.getOutDirectory()}/fonts`,
        },
        test: /\.svg$/,
    }],
};

export default moduleRules;
