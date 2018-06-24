import { Config } from "rh-utils";
import { Configuration } from "webpack";
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
                loader: "ts-loader",
                options: {
                    configFile: configService.get(WebpackConfigProperties.tsconfig),
                },
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
        libraryTarget: "umd",
        path: configService.get(WebpackConfigProperties.outDir),
    },
};
