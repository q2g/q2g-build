import { readFileSync } from "fs";
import { resolve } from "path";
import { compilation, Compiler } from "webpack";
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
        // this breaks the watcher
        compiler.hooks.afterEmit.tapAsync(
            "ExtensionDone",
            async (comp: compilation.Compilation, callback) => {

                const exists = await this.extensionService.extensionExists(this.name);
                const msg = exists ? `QRS$: update extension ${this.name}` : `QRS$: import extension ${this.name}`;
                let file: string | Buffer;

                if (exists) {
                    file = readFileSync(resolve(this.outDir, `${this.name}.js`), {encoding: "utf-8"});
                    /** hotfix after upload last line is removed add a additonal line */
                    file = file.concat("\n});");
                    await this.extensionService.updateExtension(this.name, file);
                } else {
                    file = readFileSync(resolve(this.outDir, `${this.name}.zip`));
                    await this.extensionService.importExtension(this.name, file);
                }

                process.stdout.write(`\n${msg}\n`);
                process.stdout.write(`${"-".repeat(msg.length)}\n\n`);

                callback();
            });
    }
}
