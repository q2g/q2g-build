import { readFileSync } from "fs";
import { resolve } from "path";
import { isArray } from "util";
import { IDataNode } from "../../../api/data-node";
import { IQextData } from "../../qext-file-builder/api";
import { WebpackService } from "../../webpack-builder/service/webpack.service";
import { QrsService } from "./qrs.service";

export class ExtensionService {

    public static get instance(): ExtensionService {
        return ExtensionService.oInstance;
    }

    private static oInstance: ExtensionService = new ExtensionService();

    private webpackService: WebpackService;

    private qrsService: QrsService;

    public constructor() {

        if (ExtensionService.oInstance) {
            throw new Error("Could not create instance from Extension Service, use get Instance instead");
        }

        this.webpackService = WebpackService.getInstance();
        this.qrsService     = QrsService.instance;

        ExtensionService.oInstance = this;
    }

    public getQextConfiguration(): IQextData {

        const data = this.readPackageJSON();
        const qext = data.qext || {};
        const qextData = {
            ...{
                author: data.author,
                description: data.description,
                homepage: data.homepage || "",
                id: data.name,
                keywords: data.keywords ? data.keywords.join(",") : "",
                license: data.license || "",
                name: data.name,
                repository: data.repository ? data.repository.url : "",
                version: data.version,
            },
            ...qext,
            outDirectory: this.webpackService.getConfig().getOutDirectory(),
        };

        this.webpackService.setOptions({
            outFileName: `${qext.id || data.name}.js`,
        }, true);

        return qextData as IQextData;
    }

    /**
     * tests an extension exists
     *
     * @param {string} name
     * @returns {Promise<boolean>}
     * @memberof ExtensionService
     */
    public async extensionExists(name: string): Promise<boolean> {
        const extensions = await this.qrsService.fetchExtension(name);
        return isArray(extensions) && extensions.length > 0;
    }

    public importExtension(name: string, file: Buffer) {
        return this.qrsService.importExtension(name, file);
    }

    public updateExtension(name: string, file: Buffer) {
        return this.qrsService.updateExtension(name, file);
    }

    private readPackageJSON(): IDataNode {
        const file = resolve(this.webpackService.getConfig().getProjectRoot(), "package.json");
        const pkgData = JSON.parse(readFileSync(file).toString());
        return pkgData;
    }
}
