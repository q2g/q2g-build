import { IOption } from "../../../api/option.interface";
import { ValidationHelper } from "../../../helper";

export const WebpackOption: IOption  = {
    entryFile: {
        required: false,
        validator: {
            errorMsg: "entry file should be passed as relative path like ./entry-file.ts",
            validatorFn: ValidationHelper.relativePath,
        },
    },
    environment: {
        required: false,
        values: ["development", "production"],
    },
    outDirectory: {
        required: false,
        validator: {
            errorMsg: "option outDir could not be empty",
            validatorFn: ValidationHelper.notEmptyAndNoWhitespace,
        },
    },
    outFileName: {
        required: false,
        validator: {
            errorMsg: "option outFile cout not be empty",
            validatorFn: ValidationHelper.notEmptyAndNoWhitespace,
        },
    },
    projectRoot: {
        required: false,
    },
    projectSource: {
        required: false,
    },
    tsConfigFile: {
        required: false,
        validator: {
            errorMsg: "no valid configuration file passed",
            test: /\.json$/,
        },
    },
};
