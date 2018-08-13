"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConfigService {
    constructor() {
        this.configModel = this.getConfigModel();
        this.configOptions = this.getConfigRules();
    }
    setOptions(options, patch = false) {
        const cleanedOptions = this.cleanOptions(options);
        const optionResults = this.validateOptions(cleanedOptions, patch);
        optionResults.forEach((result) => {
            if (result.errors.length === 0) {
                this.setOption(result.name, cleanedOptions[result.name]);
            }
        });
        return optionResults;
    }
    getConfig() {
        return this.configModel;
    }
    cleanOptions(source) {
        const filtered = Object.assign({}, source);
        const validOptions = this.configOptions;
        Object.keys(source).forEach((option) => {
            if (!validOptions[option]) {
                delete filtered[option];
            }
        });
        return filtered;
    }
    setOption(option, value) {
        const setterMethod = `set${option.charAt(0).toUpperCase()}${option.slice(1)}`;
        const methodExists = Object.prototype.toString.call(this.configModel[setterMethod]).slice(8, -1) === "Function";
        if (methodExists) {
            this.configModel[setterMethod](value);
        }
    }
    validateOptions(source, patch = false) {
        const options = patch ? source : this.configOptions;
        const results = [];
        Object.keys(options).forEach((optionName) => {
            const rule = this.configOptions[optionName];
            if (!rule.required && !source.hasOwnProperty(optionName)) {
                results.push({
                    errors: [],
                    name: optionName,
                });
            }
            else {
                const optionValue = source[optionName];
                const validationResult = rule.required
                    ? this.validateRequiredOption(rule, optionValue)
                    : this.validateOption(rule, optionValue);
                results.push({
                    errors: [].concat(validationResult.error),
                    name: optionName,
                });
            }
        });
        return results;
    }
    validateRequiredOption(rule, optionValue) {
        if (optionValue === undefined) {
            return {
                error: ["required"],
                isValid: false,
            };
        }
        return this.validateOption(rule, optionValue);
    }
    validateOption(rule, value) {
        let validator = rule.validatorFn;
        const validationResults = [];
        if (!validator) {
            return { isValid: true, error: [] };
        }
        if (!Array.isArray(validator)) {
            validator = [validator];
        }
        validator.forEach((validatorFn) => {
            validationResults.push(validatorFn(value));
        });
        return validationResults.reduce((previous, current) => {
            return {
                error: previous.error.concat(current.error),
                isValid: previous.isValid && current.isValid,
            };
        }, validationResults.shift());
    }
}
exports.ConfigService = ConfigService;
