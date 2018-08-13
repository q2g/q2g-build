"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("../../../helper");
const mandatoryRule = {
    required: true,
    validatorFn: [
        helper_1.ValidationHelper.isString,
        helper_1.ValidationHelper.notEmpty,
    ],
};
const optionalRule = {
    required: false,
    validatorFn: [
        helper_1.ValidationHelper.isString,
    ],
};
exports.QextConfigRuleset = {
    get author() {
        return mandatoryRule;
    },
    get dependencies() {
        return {
            required: false,
        };
    },
    get description() {
        return mandatoryRule;
    },
    get homepage() {
        return optionalRule;
    },
    get icon() {
        return mandatoryRule;
    },
    get keywords() {
        return optionalRule;
    },
    get license() {
        return optionalRule;
    },
    get name() {
        return mandatoryRule;
    },
    get outDirectory() {
        return {
            required: true,
            validatorFn: [
                helper_1.ValidationHelper.absolutePath,
            ],
        };
    },
    get preview() {
        return optionalRule;
    },
    get repository() {
        return optionalRule;
    },
    get type() {
        return mandatoryRule;
    },
    get version() {
        return mandatoryRule;
    },
};
