import { IOptionRuleSet } from "../../../api/option-rule.interface";
import { ValidationHelper } from "../../../helper";

export const TscConfigRules: IOptionRuleSet  = {
    excludeNcp: {
        required: false,
        validatorFn: ValidationHelper.isArray,
    },
    typescriptCompiler: {
        required: false,
        validatorFn: ValidationHelper.absolutePath,
    },
};
