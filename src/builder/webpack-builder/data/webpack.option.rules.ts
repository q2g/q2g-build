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

    optimization: {
        required: false,
    },

    outFileName: {
        required: false,
        validatorFn: ValidationHelper.notEmptyAndNoWhitespace,
    },

    webpackEnvironment: {
        required: false,
        validatorFn: ValidationHelper.containsValue([
            "development", "none", "production"]),
    },
};
