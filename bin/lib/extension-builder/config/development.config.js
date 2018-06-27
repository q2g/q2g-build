"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ZipPlugin = require("zip-webpack-plugin");
const development_config_1 = require("../../webpack-builder/config/development.config");
const basePlugins = [
    ...development_config_1.configuration.plugins,
];
const extensionPlugins = [
    new CopyWebpackPlugin([
        { from: `extension.qext`, to: `extension.qext` },
        { from: "wbfolder.wbl", to: "wbfolder.wbl" },
    ]),
    new ZipPlugin({
        filename: `extension.zip`,
        path: "./",
    }),
];
const extDevelopmentConfiguration = {
    plugins: [...basePlugins, ...extensionPlugins],
};
exports.default = Object.assign({}, development_config_1.configuration, extDevelopmentConfiguration);
