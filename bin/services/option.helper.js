"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
class OptionHelper {
    static convertCommandlineArguments(args) {
        const options = {};
        for (let i = 0, ln = args.length; i < ln; i++) {
            const option = args[i].slice(2);
            options[option] = args[++i];
        }
        return options;
    }
    static cleanOptions(source, target) {
        const filtered = Object.assign({}, source);
        for (const option in source) {
            if (!target.hasOwnProperty(option)) {
                delete filtered[option];
            }
        }
        return filtered;
    }
    static validateOptions(source, target) {
        let errors = [];
        for (const property in target) {
            if (!target.hasOwnProperty(property)) {
                continue;
            }
            const option = target[property];
            const optionSet = source.hasOwnProperty(property);
            const value = (source[property] || "").toString();
            if (option.required && !optionSet) {
                errors.push(`option: ${property} is required\ncall with --${property} [${option.values.join("| ")}]`);
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
    static loadFromFile(configFile) {
        if (!fs_1.existsSync(configFile)) {
            throw new Error(`configuration file ${configFile} not exists. Please check your
                command line arguments for --config.\n\n`);
        }
        const configData = fs_1.readFileSync(configFile, {
            encoding: "utf8"
        });
        return JSON.parse(configData);
    }
}
exports.OptionHelper = OptionHelper;
