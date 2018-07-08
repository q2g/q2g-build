import { IOptionRuleSet } from "../api/option-rule.interface";
import { ValidationHelper } from "../helper";

export const BuilderConfigRules: IOptionRuleSet  = {

    environment: {
        required: false,
        validatorFn: ValidationHelper.containsValue(
            ["debug", "development", "production"]),
    },

    outDirectory: {
        required: false,
        validatorFn: ValidationHelper.absolutePath,
    },

    projectRoot: {
        required: false,
        validatorFn: ValidationHelper.absolutePath,
    },

    projectSource: {
        required: false,
        validatorFn: ValidationHelper.absolutePath,
    },

    tsConfigFile: {
        required: false,
        validatorFn: ValidationHelper.absolutePath,
    },
};
