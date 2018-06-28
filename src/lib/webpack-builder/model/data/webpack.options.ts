import { IOption } from "../../../../api/option.interface";

/**
 * no whitespace or empty
 */
const NO_WS_EMPTY = /^(?!.*\s)|\w+$/;

export const WebpackOption: IOption  = {
    entryFile: {
        required: false,
        validator: {
            errorMsg: "config value entry could not be empty.",
            test: NO_WS_EMPTY,
        },
    },
    outFileName: {
        required: false,
        validator: {
            errorMsg: "option outFile cout not be empty",
            test: NO_WS_EMPTY,
        },
    },
    outputDirectory: {
        required: false,
        validator: {
            errorMsg: "option outDir could not be empty",
            test: NO_WS_EMPTY,
        },
    },
    tsConfigFile: {
        required: false,
        validator: {
            errorMsg: "no valid configuration file passed",
            test: /\.json$/,
        },
    },
};
