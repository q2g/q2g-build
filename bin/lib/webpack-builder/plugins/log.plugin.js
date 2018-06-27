"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rh_utils_1 = require("rh-utils");
class LogPlugin {
    constructor() {
        this.logService = rh_utils_1.Log.getInstance();
    }
    apply(compiler) {
        compiler.hooks.done.tap("CompilerDone", (result) => {
            if (!result.hasErrors()) {
                return;
            }
            const statsJson = result.toJson();
            const stats = statsJson.valueOf();
            const errors = stats.errors;
            this.logService.log(errors.join("\n\n"), rh_utils_1.Log.LOG_ERROR);
        });
    }
}
exports.LogPlugin = LogPlugin;
