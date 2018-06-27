"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionProperties = {
    builder: {
        required: true,
        values: ["webpack", "extension"],
    },
    config: {
        required: false,
        validator: {
            errorMsg: `Invalid argument for "config", use --config [filename].json\n\n`,
            test: /\.json$/,
        },
    },
};
