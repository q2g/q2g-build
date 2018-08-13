"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("../../../helper");
exports.WebpackOptionRules = {
    entryFile: {
        required: false,
        validatorFn: helper_1.ValidationHelper.relativePath,
    },
    externalModule: {
        required: false,
        validatorFn: helper_1.ValidationHelper.isArray,
    },
    optimization: {
        required: false,
    },
    outFileName: {
        required: false,
        validatorFn: helper_1.ValidationHelper.notEmptyAndNoWhitespace,
    },
    webpackEnvironment: {
        required: false,
        validatorFn: helper_1.ValidationHelper.containsValue([
            "development", "none", "production"
        ]),
    },
};
