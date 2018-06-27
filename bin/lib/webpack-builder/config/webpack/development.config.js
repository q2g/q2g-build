"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_plugin_1 = require("../../plugins/log.plugin");
const base_config_1 = require("./base.config");
const basePlugins = [
    ...base_config_1.baseConfiguration.plugins,
];
const developmentPlugins = [
    new log_plugin_1.LogPlugin(),
];
const developmentConfiguration = {
    mode: "production",
    plugins: [...basePlugins, ...developmentPlugins],
};
exports.default = Object.assign({}, base_config_1.baseConfiguration, developmentConfiguration);
