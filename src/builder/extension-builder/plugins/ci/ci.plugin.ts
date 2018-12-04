import { readFileSync } from "fs";
import { resolve } from "path";
import { Compiler, Stats } from "webpack";
import { ExtensionService } from "../../service/extension.service";

export class DeployExtensionPlugin {

    private extensionService: ExtensionService;

    private name: string;

    private outDir: string;

    public constructor(name: string, outdir: string) {
        this.extensionService = ExtensionService.instance;
        this.name   = name.replace(/(.*?)\.[^\.]+$/, "\$1");
        this.outDir = outdir;
    }

    public apply(compiler: Compiler) {
        compiler.hooks.done.tapAsync(
            "ExtensionDone",
            async (stats: Stats) => {
                const exists = await this.extensionService.extensionExists(this.name);

                if (exists) {
                    // update extension
                    process.stdout.write("update");
                } else {
                    const file = readFileSync(resolve(this.outDir, `${this.name}.zip`));
                    return this.extensionService.importExtension(this.name, file);
                }
            });
    }
}
