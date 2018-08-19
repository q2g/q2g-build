import { readFileSync } from "fs";
import { resolve } from "path";
import { IDataNode } from "../../../api/data-node";
import { IQextData } from "../../qext-file-builder/api";
import { WebpackService } from "../../webpack-builder/service/webpack.service";

export class ExtensionService {

    private webpackService: WebpackService;

    public constructor() {
        this.webpackService  = WebpackService.getInstance();
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

    private readPackageJSON(): IDataNode {
        const file = resolve(this.webpackService.getConfig().getProjectRoot(), "package.json");
        const pkgData = JSON.parse(readFileSync(file).toString());
        return pkgData;
    }
}
