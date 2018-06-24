import { Configuration } from "webpack";
import { Config } from "rh-utils";
import { NAMESPACE_WEBPACK_CONFIGURATION } from "../../../../api";
import { ConfigurationPropertys } from "../../api/config";

const configService = Config.getInstance();

export const baseConfiguration: Configuration = {

    optimization: {
        minimize: false
    },

    context: configService.get(NAMESPACE_WEBPACK_CONFIGURATION.SOURCE_ROOT),

    entry: () => {
        try {
            return `./${configService.get(ConfigurationPropertys.entry)}`;
        } catch ( error ) {
            return "./index.ts"
        }
    },

    module: {
        rules: [
            {
                test: /.*\.tsx?$/,
                loader: "ts-loader"
            }
        ]
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    resolveLoader: {
        /**
         * tell webpack where to find our loaders
         * otherwise it will search in the current working directory
         * which is that directory which has consumed base_loader module
         */
        modules: [configService.get(NAMESPACE_WEBPACK_CONFIGURATION.LOADER_RESOLVER)],
        mainFields: ['loader', 'main']
    },

    output: {
        path: configService.get(ConfigurationPropertys.outDir),
        filename: configService.get(ConfigurationPropertys.outFile)
    }
};
