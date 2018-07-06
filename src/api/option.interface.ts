/**
 * pattern for command line options to check
 */
export interface IOption {
    [optionName: string]: {
        required: boolean;
        validator?: {
            errorMsg: string;
            validatorFn?: (data: any) => boolean;
            test?: RegExp;
        },
        values?: string[];
    };
}
