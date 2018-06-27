"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CleanRequireJsImports {
    apply(compiler) {
        compiler.hooks.compile.tap("cleanRequireJs.onBeforeRun", (result) => {
            console.log(result.inputFileSystem);
        });
    }
}
exports.CleanRequireJsImports = CleanRequireJsImports;
