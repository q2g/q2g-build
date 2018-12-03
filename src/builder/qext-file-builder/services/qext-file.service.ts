import { existsSync, mkdirSync, writeFileSync } from "fs";
import { resolve, sep } from "path";
import { QextConfigService } from "./qext-config.service";

export class QextFileService {

    private configService: QextConfigService;

    public constructor() {
        this.configService = QextConfigService.getInstance();
    }

    public createFile(): string {
        const data         = this.configService.toJson();
        const outDirectory = this.configService.getConfig().getOutDirectory();
        const filePath     = resolve(outDirectory, `${this.configService.getConfig().getId()}.qext` );

        if (!existsSync(outDirectory)) {
            this.createDirectory(outDirectory);
        }
        writeFileSync(filePath, JSON.stringify(data, null, 4), { encoding: "utf8" });
        return filePath;
    }

    private createDirectory(path: string) {
        const paths = path.split(sep);
        let fullPath = "";
        paths.forEach((partial) => {
            if (fullPath === "") {
                fullPath = partial;
            } else {
                fullPath = [fullPath, partial].join(sep);
            }

            try {
                if (!existsSync(fullPath)) {
                    mkdirSync(fullPath);
                }
            } catch (error) {
                process.stderr.write(`Could not create Directory: ${fullPath}`);
                process.exit(1);
            }
        });
    }
}
