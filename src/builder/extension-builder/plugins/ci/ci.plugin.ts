import { readFileSync } from "fs";
import { resolve } from "path";
import { Compilation, Compiler } from "webpack";
import { ICiConfig } from "../../api/ci-config.interface";
import { IExtensionFile } from "../../api/extensionFile.interface";
import { DesktopService } from "../../service/desktop.service";
import { ExtensionService } from "../../service/extension.service";

export class DeployExtensionPlugin {

    private extensionService: ExtensionService;

    private desktopService: DesktopService;

    private name: string;

    private outDir: string;

    private config: ICiConfig;

    public constructor(name: string, outdir: string, config: ICiConfig) {
        this.extensionService = ExtensionService.instance;
        this.desktopService = DesktopService.instance;
        this.name = name.replace(/(.*?)\.[^\.]+$/, "\$1");
        this.outDir = outdir;
        this.config = config;
    }

    public apply(compiler: Compiler) {
        // this breaks the watcher
        compiler.hooks.afterEmit.tapAsync(
            "ExtensionDone",
            async (comp: Compilation, callback) => {

                if (typeof (this.config.desktop) !== "undefined") {
                    const files: IExtensionFile[] = [];
                    files.push({
                        file: readFileSync(resolve(this.outDir, `${this.name}.js`)),
                        filename: `${this.name}.js`,
                    });
                    files.push({
                        file: readFileSync(resolve(this.outDir, `${this.name}.qext`)),
                        filename: `${this.name}.qext`,
                    });
                    files.push({
                        file: readFileSync(resolve(this.outDir, "wbfolder.wbl")),
                        filename: "wbfolder.wbl",
                    });

                    if (typeof(this.config.desktop) === "string") {
                        await this.desktopService.copyExtension(this.name, files, this.config.desktop);
                    }

                    if (typeof(this.config.desktop) === "boolean") {
                        await this.desktopService.copyExtension(this.name, files);
                    }

                }

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
