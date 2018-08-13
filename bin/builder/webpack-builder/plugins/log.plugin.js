"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LogPlugin {
    apply(compiler) {
        compiler.hooks.done.tap("CompilerDone", (result) => {
            if (!result.hasErrors()) {
                return;
            }
            const statsJson = result.toJson();
            const stats = statsJson.valueOf();
            const errors = stats.errors;
            throw new Error(errors.join(`\r\n`));
        });
    }
}
exports.LogPlugin = LogPlugin;
