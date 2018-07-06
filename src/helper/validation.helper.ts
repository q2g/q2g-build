export class ValidationHelper {

    /**
     * validate string is not empty
     *
     * @static
     * @param {string} text
     * @returns {boolean}
     * @memberof ValidatorHelper
     */
    public static notEmpty(text: string): boolean {
        return ValidationHelper.trim(text).length > 0;
    }

    /**
     * validate string for not empty and no white space values
     *
     * @static
     * @param {string} text
     * @returns {boolean}
     * @memberof ValidatorHelper
     */
    public static notEmptyAndNoWhitespace(text: string): boolean {

        const data = ValidationHelper.trim(text);

        if ( data.length === 0 ) {
            return false;
        }

        // find any match which is followed by an whitespace
        if ( text.match(/^.*?(?=\s)/g) ) {
            return false;
        }

        return true;
    }

    /**
     * validate given argument is a relative path
     *
     * @static
     * @param {string} path
     * @returns {boolean}
     * @memberof ValidatorHelper
     */
    public static relativePath(path: string): boolean {
        return path.match(/^\.{1,2}\/.{1,}$/) !== null;
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
}
