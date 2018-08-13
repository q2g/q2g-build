import { IDataNode } from "./data-node";
import { IValidationResult } from "./validation-result.interface";

/**
 * pattern for command line options to check
 */
export interface IOptionRuleSet extends IDataNode {
    [optionName: string]: IOptionRule;
}

export interface IOptionRule {
    required: boolean;
    validatorFn?: Array<(data: any) => IValidationResult> | ((data: any) => IValidationResult);
}
