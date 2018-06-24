/**
 * pattern for command line options to check
 */
interface IOptionProperty {
    [optionName: string]: {
        required: boolean;
        validator?: {
            test: RegExp;
            errorMsg: string;
        },
        values?: string[];
    };
}

/**
 * only for validation to loop and get option
 * properties to check with given options
 */
export const OptionProperties: IOptionProperty  = {
    builder: {
        required: true,
        values: ["webpack"],
    },
    config: {
        required: false,
        validator: {
            errorMsg: `Invalid argument for "config", use --config [filename].json\n\n`,
            test: /\.json$/,
        },
    },
};
