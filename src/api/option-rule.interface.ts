/**
 * pattern for command line options to check
 */
export interface IOptionRuleSet {
    [optionName: string]: IOptionRule;
}

export interface IOptionRule {
    required: boolean;
    validatorFn?: (data: any) => boolean;
}
