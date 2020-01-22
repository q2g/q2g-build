import { Configuration } from "webpack";
import { WebpackService } from "../service/webpack.service";

const config = WebpackService.getInstance().getConfig();

const webpackConfig: Configuration = {

    context: config.getProjectSource(),

    entry: config.getEntryFile(),

    externals: config.getExternalModules() || [],

    mode: config.getEnvironment(),

    optimization:  config.getOptimization(),

    module: config.moduleRules,

    resolve: {
        extensions: [".ts", ".js"],
    },

    resolveLoader: {
        /**
         * tell webpack where to find our loaders
         * otherwise it will search in the project root directory
         */
        alias: {
            css:  "css-loader",
            text: "raw-loader",
        },
        mainFields: ["loader", "main"],
        modules: config.getLoaderContextPaths(),
    },

    output: {
        filename: "[name].js",
        libraryTarget: "umd",
        path: config.getOutDirectory(),
    },

    plugins: config.getPlugins(),
};

export default webpackConfig;
