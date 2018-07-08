import { IOptionRuleSet } from "../../../api/option-rule.interface";
import { ValidationHelper } from "../../../helper";

export const WebpackOptionRules: IOptionRuleSet  = {
    entryFile: {
        required: false,
        validatorFn: ValidationHelper.relativePath,
    },
    externalModule: {
        required: false,
        validatorFn: ValidationHelper.isArray,
    },
    outFileName: {
        required: false,
        validatorFn: ValidationHelper.notEmptyAndNoWhitespace,
    },
};
