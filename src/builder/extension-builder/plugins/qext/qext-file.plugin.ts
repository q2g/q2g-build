import { readFileSync, statSync } from "fs";
import { basename } from "path";
import { compilation, Compiler } from "webpack";
import { IQextData } from "../../../qext-file-builder/api";
import { QextFileBuilder } from "../../../qext-file-builder/qext-file.builder";

export class QextFilePlugin {

    private qextBuilder: QextFileBuilder;

    private qextConfig: IQextData;

    public constructor(qextConfig: IQextData) {
        this.qextConfig  = qextConfig;
        this.qextBuilder = new QextFileBuilder();
    }

    public apply(compiler: Compiler) {
        compiler.hooks.beforeRun.tap("QextBeforeRun", () => {
            this.qextBuilder.configure(this.qextConfig);
        });
        this.registerAfterCompilationHook( compiler );
    }

    /**
     * register after compile hook to generate Qext File
     *
     * @private
     * @param {Compiler} compiler
     * @memberof QextFilePlugin
     */
    private registerAfterCompilationHook(compiler: Compiler) {
        compiler.hooks.afterCompile.tapAsync("QextAfterCompile", async (
            comp: compilation.Compilation,
            callback,
        ) => {
            const filePath = await this.qextBuilder.run();
            const fileName = basename(filePath);
            const fileStats = statSync(filePath);

            comp.assets[fileName] = {
                size: () => {
                    return fileStats.size;
                },
                source: () => {
                    return readFileSync(filePath);
                },
            };
            callback();
        });
    }
}
