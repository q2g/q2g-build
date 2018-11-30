import { Module } from "webpack";
import { WebpackService } from "../service/webpack.service";

const config = WebpackService.getInstance().getConfig();

const moduleRules: Module = {
    rules: [{
        sideEffects: false,
        test: /\.(tsx?|js)$/,
        use: [{
            /**
             * remove all require js import css loader plugins
             * otherwise bundle will fail
             */
            loader: "clean-requirejs-imports.loader",
        }],
    }, {
        test: /text!.*\.html$/,
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
};

export default moduleRules;
