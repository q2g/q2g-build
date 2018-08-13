"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
class ValidationHelper {
    static notEmpty(val) {
        let isValid = true;
        switch (ValidationHelper.getType(val)) {
            case "array":
                isValid = val.length > 0;
                break;
            case "string":
                isValid = ValidationHelper.trim(val).length > 0;
                break;
            default:
                isValid = false;
        }
        return {
            error: isValid ? [] : ["not empty"],
            isValid,
        };
    }
    static notEmptyAndNoWhitespace(text) {
        const data = ValidationHelper.trim(text);
        let isValid = true;
        isValid = data.length !== 0;
        isValid = isValid && text.match(/^.*?(?=\s)/g) === null;
        return {
            error: isValid ? [] : ["could not be empty and no whitespaces allowed"],
            isValid,
        };
    }
    static relativePath(path) {
        const isValid = path.match(/^\.{1,2}\/.{1,}$/) !== null;
        const error = [];
        if (!isValid) {
            error.push("given value is not a relative path");
        }
        return { error, isValid };
    }
    static absolutePath(path) {
        const isValid = path_1.isAbsolute(path);
        return {
            error: isValid ? [] : ["must be a absolute path"],
            isValid,
        };
    }
    static containsValue(accepetedValues) {
        return (value) => {
            const isValid = accepetedValues.indexOf(value) > -1;
            return {
                error: isValid
                    ? []
                    : [`given value is not accepted Possible values are ${accepetedValues.join(", ")}`],
                isValid,
            };
        };
    }
    static isArray(value) {
        const isValid = Array.isArray(value);
        return {
            error: isValid ? [] : [`no array`],
            isValid,
        };
    }
    static isString(value) {
        const type = ValidationHelper.getType(value);
        const isValid = type === "string";
        return {
            error: isValid ? [] : [`no string value`],
            isValid,
        };
    }
    static trim(text) {
        return text.replace(/^\s*|\s*$/gm, "");
    }
    static getType(value) {
        return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
    }
}
exports.ValidationHelper = ValidationHelper;
