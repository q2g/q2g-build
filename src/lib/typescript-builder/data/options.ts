import { IOption } from "../../../api/option.interface";
import { ValidationHelper } from "../../../helper";

export const Options: IOption  = {
    excludeNcp: {
        required: false,
    },
    outDirectory: {
        required: false,
        validator: {
            errorMsg: `Output directory must be a relative path like "./dist" .`,
            validatorFn: ValidationHelper.relativePath,
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
            errorMsg: "no valid typescript configuration file passed for tsConfigFile",
            validatorFn: ValidationHelper.relativePath,
        },
    },
};
