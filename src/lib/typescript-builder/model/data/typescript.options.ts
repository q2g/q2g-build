import { IOption } from "../../../../api/option.interface";

/**
 * no whitespace or empty
 */
const NO_WS_EMPTY = /^(?!.*\s)|\w+$/;

export const TypescriptOption: IOption  = {
    tsConfigFile: {
        required: false,
        validator: {
            errorMsg: "no valid typescript configuration file passed for tsConfigFile",
            test: /\.json$/,
        },
    },
};
