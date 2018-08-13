import { IOptionRuleSet, IValidationResult } from "../../../../../src/api";

export const TestConfigRulesInvalid: IOptionRuleSet = {

    name: {
        required: true,
        validatorFn: (val: string): IValidationResult => {
            return {
                error: ["name must have 10 chars"],
                isValid: false,
            };
        },
    },

    description: {
        required: true,
        validatorFn: [
            (val: string): IValidationResult => {
                return {
                    error: ["description could not be empty"],
                    isValid: false,
                };
            },
            (val: string): IValidationResult => {
                return {
                    error: ["20 chars required"],
                    isValid: false,
                };
            },
        ],
    },
};

export const TestConfigRulesValid: IOptionRuleSet = {

    name: {
        required: true,
        validatorFn: (val: string): IValidationResult => {
            return {
                error: [],
                isValid: true,
            };
        },
    },

    description: {
        required: true,
        validatorFn: [
            (val: string): IValidationResult => {
                return {
                    error: [],
                    isValid: true,
                };
            },
            (val: string): IValidationResult => {
                return {
                    error: [],
                    isValid: true,
                };
            },
        ],
    },
};

export const TestConfigRulesNotRequired: IOptionRuleSet = {

    name: {
        required: false,
        validatorFn: (val: string): IValidationResult => {
            return {
                error: ["name is not required but has error"],
                isValid: false,
            };
        },
    },

    description: {
        required: false,
    },
};
