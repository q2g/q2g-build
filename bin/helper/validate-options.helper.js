"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../api");
function validateOptions(options) {
    let errors = [];
    for (const property in api_1.OptionProperties) {
        if (!api_1.OptionProperties.hasOwnProperty(property)) {
            continue;
        }
        const option = api_1.OptionProperties[property];
        const optionSet = options.hasOwnProperty(property);
        const value = (options[property] || "").toString();
        if (option.required && !optionSet) {
            errors.push(`option: ${property} is required\ncall with --${property} [${option.values.join("| ")}]\n\n`);
            continue;
        }
        if (optionSet) {
            if (option.hasOwnProperty("validator")) {
                const isInvalid = !value.match(option.validator.test);
                errors = errors.concat(isInvalid ? [option.validator.errorMsg] : []);
            }
            else {
                const isInvalid = option.values.indexOf(value) === -1;
                errors = errors.concat(isInvalid
                    ? `invalid property value submitted: "${value}" for option --${property}\n
                       requires on of these values: "${option.values.join(", ")}"\n\n`
                    : []);
            }
        }
    }
    return errors;
}
exports.validateOptions = validateOptions;
