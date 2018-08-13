"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_model_1 = require("../../../model/config.model");
class TscConfigModel extends config_model_1.ConfigModel {
    getExcludeNcp() {
        return this.excludeNcp;
    }
    getTypescriptCompiler() {
        return this.typescriptCompiler;
    }
    setExcludeNcp(patterns) {
        this.excludeNcp = patterns;
    }
    setTypescriptCompiler(path) {
        this.typescriptCompiler = path;
    }
}
exports.TscConfigModel = TscConfigModel;
