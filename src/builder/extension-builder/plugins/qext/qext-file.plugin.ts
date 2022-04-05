import { readFileSync, statSync, existsSync } from "fs";
import { basename } from "path";
import { Compiler, Compilation } from "webpack";
import { IQextData } from "../../../qext-file-builder/api";
import { QextFileBuilder } from "../../../qext-file-builder/qext-file.builder";

export class QextFilePlugin {

    private qextBuilder: QextFileBuilder;

    private qextConfig: IQextData;

    public constructor(qextConfig: IQextData) {
        this.qextConfig  = qextConfig;
        this.qextBuilder = new QextFileBuilder();
        this.qextBuilder.configure(this.qextConfig);
    }

    public apply(compiler: Compiler) {
        this.registerMakeHook(compiler);
    }

    /**
     * register after compile hook to generate Qext File
     *
     * @private
     * @param {Compiler} compiler
     * @memberof QextFilePlugin
     */
    private registerMakeHook(compiler: Compiler) {
        compiler.hooks.make.tapAsync("QextAfterCompile", async (
            comp, // ToDo rebuild to Compilation Type
            callback,
        ) => {
            const filePath = await this.qextBuilder.run();
            const fileName  = basename(filePath);
            const fileStats = statSync(filePath);
            const fileContent = readFileSync(filePath);

            (comp as any).assets[fileName] = {
                size: () => {
                    return fileStats.size;
                },
                source: () => {
                    /** file not exists anymore ...  */
                    return fileContent;
                },
                
            };
            callback();
        });
    }
}
