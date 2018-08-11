import { isAbsolute } from "path";
import { IValidationResult } from "../api/validation-result.interface";

export class ValidationHelper {

    /**
     * validate string is not empty
     *
     * @static
     * @param {string} text
     * @returns {boolean}
     * @memberof ValidatorHelper
     */
    public static notEmpty(text: string): IValidationResult {
        const isValid = ValidationHelper.trim(text).length > 0;

        return {
            error: isValid ? "" : "is empty",
            isValid,
        };
    }

    /**
     * validate string for not empty and no white space values
     *
     * @static
     * @param {string} text
     * @returns {boolean}
     * @memberof ValidatorHelper
     */
    public static notEmptyAndNoWhitespace(text: string): IValidationResult {

        const data = ValidationHelper.trim(text);
        let isValid = true;

        isValid = data.length !== 0;
        isValid = isValid && !! text.match(/^.*?(?=\s)/g).length;

        return {
            error: isValid ? "" : "no whitespaces allowed",
            isValid,
        };
    }

    /**
     * validate given argument is a relative path
     *
     * @static
     * @param {string} path
     * @returns {boolean}
     * @memberof ValidatorHelper
     */
    public static relativePath(path: string): IValidationResult {
        const isValid = path.match(/^\.{1,2}\/.{1,}$/) !== null;

        return {
            error: isValid ? "" : "given value is not a relative path",
            isValid,
        };
    }

    /**
     * validate given value is an absolute path
     *
     * @static
     * @param {string} path
     * @returns {IValidationResult}
     * @memberof ValidationHelper
     */
    public static absolutePath(path: string): IValidationResult {
        const isValid = isAbsolute(path);
        return {
            error: isValid ? "" : "must be a absolute path",
            isValid,
        };
    }

    /**
     * validate value is in array
     *
     * @static
     * @param {string[]} accepetedValues
     * @param {string} value
     * @returns {boolean}
     * @memberof ValidationHelper
     */
    public static containsValue(accepetedValues: string[]): (value: string) => IValidationResult {
        return (value: string): IValidationResult => {
            const isValid = accepetedValues.indexOf(value) > -1;

            return {
                error: isValid ? "" : `given value is not accepted.
                Possible values are ${accepetedValues.join(", ")}`,
                isValid,
            };
        };
    }

    /**
     * validate given value is an object
     *
     * @static
     * @param {*} value
     * @returns {IValidationResult}
     * @memberof ValidationHelper
     */
    public static isArray(value): IValidationResult {
        const isValid = Array.isArray(value);

        return {
            error: isValid ? "" : `no array`,
            isValid,
        };
    }

    /**
     * validate value is string value
     *
     * @static
     * @param {*} value
     * @returns {boolean}
     * @memberof ValidationHelper
     */
    public static isString(value): boolean {
        const type = this.getType(value);
        return type.slice(8, -1).toLowerCase() === "string";
    }

    /**
     * trim text
     *
     * @private
     * @static
     * @param {*} text
     * @returns {string}
     * @memberof ValidatorHelper
     */
    private static trim(text): string {
        return text.replace(/^\s*|\s*$/gm, "");
    }

    /**
     * get type of value
     *
     * @private
     * @static
     * @param {*} value
     * @returns {string}
     * @memberof ValidationHelper
     */
    private static getType(value): string {
        return Object.prototype.toString.call(value);
    }
}
