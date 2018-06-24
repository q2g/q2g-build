import { WebpackConfigProperties } from "@webpack-builder/api";
import { Config } from "rh-utils";
import { Configuration } from "webpack";

const configService = Config.getInstance();

export const baseConfiguration: Configuration = {

    optimization: {
        minimize: false,
    },

    context: configService.get(WebpackConfigProperties.context),

    entry: () => {
        try {
            return `./${configService.get(WebpackConfigProperties.entry)}`;
        } catch ( error ) {
            return "./index.ts";
        }
    },

    module: {
        rules: [
            {
                loader: "ts-loader",
                test: /.*\.tsx?$/,
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
        mainFields: ["loader", "main"],
        modules: [configService.get(WebpackConfigProperties.loaderContext)],
    },

    output: {
        filename: configService.get(WebpackConfigProperties.outFile),
        path: configService.get(WebpackConfigProperties.outDir),
    },
};
