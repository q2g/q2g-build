import { IOptionRule, IOptionRuleSet } from "../../../api";
import { ValidationHelper } from "../../../helper";

const mandatoryRule: IOptionRule = {
    required: true,
    validatorFn: [
        ValidationHelper.isString,
        ValidationHelper.notEmpty,
    ],
};

export const QextConfigRuleset: IOptionRuleSet = {

    get author(): IOptionRule {
        return mandatoryRule;
    },

    get description(): IOptionRule {
        return mandatoryRule;
    },

    get icon(): IOptionRule {
        return mandatoryRule;
    },

    get name(): IOptionRule {
        return mandatoryRule;
    },

    get type(): IOptionRule {
        return mandatoryRule;
    },

    get version(): IOptionRule {
        return mandatoryRule;
    },
};
