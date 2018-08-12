import { IOptionRule, IOptionRuleSet } from "../../../api";
import { ValidationHelper } from "../../../helper";

const mandatoryRule: IOptionRule = {
    required: true,
    validatorFn: [
        ValidationHelper.isString,
        ValidationHelper.notEmpty,
    ],
};

const optionalRule: IOptionRule = {
    required: false,
    validatorFn: [
        ValidationHelper.isString,
    ],
};

/**
 * config ruleset for qext configuration
 */
export const QextConfigRuleset: IOptionRuleSet = {

    get author(): IOptionRule {
        return mandatoryRule;
    },

    get dependencies(): IOptionRule {
        return {
            required: false,
        };
    },

    get description(): IOptionRule {
        return mandatoryRule;
    },

    get homepage(): IOptionRule {
        return optionalRule;
    },

    get icon(): IOptionRule {
        return mandatoryRule;
    },

    get keywords(): IOptionRule {
        return optionalRule;
    },

    get license(): IOptionRule {
        return optionalRule;
    },

    get name(): IOptionRule {
        return mandatoryRule;
    },

    get outDirectory(): IOptionRule {
        return {
            required: true,
            validatorFn: [
                ValidationHelper.absolutePath,
            ],
        };
    },

    get preview(): IOptionRule {
        return optionalRule;
    },

    get repository(): IOptionRule {
        return optionalRule;
    },

    get type(): IOptionRule {
        return mandatoryRule;
    },

    get version(): IOptionRule {
        return mandatoryRule;
    },
};
