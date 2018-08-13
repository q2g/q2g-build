"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("../helper");
exports.BuilderConfigRules = {
    environment: {
        required: false,
        validatorFn: helper_1.ValidationHelper.containsValue(["debug", "development", "production"]),
    },
    outDirectory: {
        required: false,
        validatorFn: helper_1.ValidationHelper.absolutePath,
    },
    projectRoot: {
        required: false,
        validatorFn: helper_1.ValidationHelper.absolutePath,
    },
    projectSource: {
        required: false,
        validatorFn: helper_1.ValidationHelper.absolutePath,
    },
    tsConfigFile: {
        required: false,
        validatorFn: helper_1.ValidationHelper.absolutePath,
    },
};
