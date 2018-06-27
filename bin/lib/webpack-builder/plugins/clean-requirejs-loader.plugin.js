"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = require("webpack");
class CleanRequireJsLoader extends webpack_1.Plugin {
    apply(compiler) {
        compiler.plugin("normal-module-factory", () => {
        });
    }
}
exports.CleanRequireJsLoader = CleanRequireJsLoader;
