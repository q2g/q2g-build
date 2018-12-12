import { existsSync, mkdirSync, writeFile } from "fs";
import { homedir } from "os";
import { isNullOrUndefined } from "util";
import { IExtensionFile } from "../api/extensionFile.interface";

export class DesktopService {

    public static get instance(): DesktopService {
        return DesktopService.desktopInstance;
    }

    private static desktopInstance: DesktopService = new DesktopService();

    private defaultPath = `${homedir}\\Documents\\Qlik\\Sense\\Extensions\\`;

    public constructor() {
        if (DesktopService.desktopInstance) {
            throw new Error("could not create instance of QrsService, use QrsServcice.instance instead");
        }
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        DesktopService.desktopInstance = this;
    }

    public copyExtension(extensionName: string, files: IExtensionFile[], path?: string): Promise<void> {
        return new Promise((resolveProm, reject) => {
            if (typeof (path) === "undefined") {
                path = this.defaultPath;
            }

            if (!existsSync(`${path}/${extensionName}`)) {
                mkdirSync(`${path}/${extensionName}`);
            }

            const assistArrProm: Array<Promise<void>> = [];

            for (const file of files) {
                assistArrProm.push(this.writeFilePromise(`${path}/${extensionName}/${file.filename}`, file.file));
            }

            Promise.all(assistArrProm)
                .then(() => resolveProm())
                .catch((e) => reject(e));
        });
    }

    private writeFilePromise(path: string, file: string | Buffer): Promise<void> {
        return new Promise((resolveProm, reject) => {
            writeFile(path, file, (e) => {
                if (!isNullOrUndefined(e)) {
                    reject(e);
                }
                resolveProm();
            });
        });
    }

}
