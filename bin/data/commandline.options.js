"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("../helper");
exports.CommandlineOptions = {
    builder: {
        required: true,
        validatorFn: helper_1.ValidationHelper.containsValue(["webpack", "extension", "tsc"]),
    },
    config: {
        required: false,
    },
    env: {
        required: false,
        validatorFn: helper_1.ValidationHelper.containsValue(["development", "production"]),
    },
};
