import { readFileSync } from "fs";
import { resolve } from "path";
import { compilation, Compiler } from "webpack";
import { ExtensionService } from "../../service/extension.service";

export class DeployExtensionPlugin {

    private extensionService: ExtensionService;

    private name: string;

    private outDir: string;

    public constructor(name: string, outdir: string, a: any) {
        this.extensionService   = ExtensionService.instance;
        this.name               = name.replace(/(.*?)\.[^\.]+$/, "\$1");
        this.outDir             = outdir;
    }

    public apply(compiler: Compiler) {
        // this breaks the watcher
        compiler.hooks.afterEmit.tapAsync(
            "ExtensionDone",
            async (comp: compilation.Compilation, callback) => {

                // switch () {
                //     case 1:
                //         // a
                //         break;
                //     default:
                //         break;
                // }

                const exists = await this.extensionService.extensionExists(this.name);
                const msg = exists ? `QRS$: update extension ${this.name}` : `QRS$: import extension ${this.name}`;
                let file: string | Buffer;

                if (exists) {
                    file = readFileSync(resolve(this.outDir, `${this.name}.js`));
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
