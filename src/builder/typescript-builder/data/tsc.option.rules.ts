import { IOptionRuleSet } from "../../../api/option-rule.interface";
import { ValidationHelper } from "../../../helper";

export const TscConfigRules: IOptionRuleSet  = {
    excludeNcp: {
        required: false,
        validatorFn: ValidationHelper.isArray,
    },
    tsConfigFile: {
        required: false,
        validatorFn: ValidationHelper.relativePath,
    },
    typescriptCompiler: {
        required: false,
        validatorFn: ValidationHelper.relativePath,
    },
};
