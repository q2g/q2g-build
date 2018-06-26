import { IOption } from "../../api/option.interface";

/**
 * no whitespace or empty
 */
const NO_WS_EMPTY = /^(?!.*\s)|\w+$/;

export const WebpackOption: IOption  = {
    entry: {
        required: false,
        validator: {
            errorMsg: "config value entry could not be empty.",
            test: NO_WS_EMPTY,
        },
    },
   outDir: {
       required: false,
       validator: {
           errorMsg: "option outDir could not be empty",
           // match as many as possible but no whitespace and at least 1 character
           test: NO_WS_EMPTY,
       },
   },
   outFile: {
       required: false,
       validator: {
           errorMsg: "option outFile cout not be empty",
           test: NO_WS_EMPTY,
       },
   },
};
