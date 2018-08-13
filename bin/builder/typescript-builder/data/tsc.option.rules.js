"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("../../../helper");
exports.TscConfigRules = {
    excludeNcp: {
        required: false,
        validatorFn: helper_1.ValidationHelper.isArray,
    },
    typescriptCompiler: {
        required: false,
        validatorFn: helper_1.ValidationHelper.absolutePath,
    },
};
