import { IOptionRuleSet } from "../../../api/option-rule.interface";
import { ValidationHelper } from "../../../helper";

export const WebpackOptionRules: IOptionRuleSet  = {

    entryFile: {
        required: true,
    },

    externalModule: {
        required: false,
        validatorFn: ValidationHelper.isArray,
    },

    optimization: {
        required: false,
    },

    outFileName: {
        required: false,
        validatorFn: ValidationHelper.notEmptyAndNoWhitespace,
    },

    watch: {
        required: false,
    },
};
