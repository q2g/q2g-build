/**
 * pattern for command line options to check
 */
export interface IOption {
    [optionName: string]: {
        required: boolean;
        validator?: {
            test: RegExp;
            errorMsg: string;
        },
        values?: string[];
    };
}
