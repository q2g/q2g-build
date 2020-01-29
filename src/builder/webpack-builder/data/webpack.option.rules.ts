import { IOptionRuleSet } from "../../../api/option-rule.interface";
import { ValidationHelper } from "../../../helper";

export const WebpackOptionRules: IOptionRuleSet  = {

    rootDir: {
        required: true,
    },

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

    binaries: {
        required: false,
        validatorFn: (value) => {
            const isValid = Array.isArray(value);
            return {
                error: isValid ? [] : ["requires an array of relative paths, files"],
                isValid,
            };
        },
    },

    watch: {
        required: false,
    },

    ci: {
        required: false,
    },
};
