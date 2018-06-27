"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_config_1 = require("./base.config");
const productionConfig = {
    mode: "production",
};
exports.default = Object.assign({}, base_config_1.baseConfiguration, productionConfig);
