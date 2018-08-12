import { readFileSync } from "fs";
import { resolve } from "path";
import { IDataNode } from "../../../api/data-node";
import { QextFileBuilder } from "../../qext-file-builder/qext-file.builder";
import { WebpackService } from "../../webpack-builder/service/webpack.service";

export class ExtensionService {

    private webpackService: WebpackService;

    private qextFileBuilder: QextFileBuilder;

    public constructor() {
        this.webpackService  = WebpackService.getInstance();
        this.qextFileBuilder = new QextFileBuilder();
    }

    public initializeQextData() {

        let data = this.readPackageJSON();
        const qext = data.qext || {};

        data = {
            author: data.author,
            description: data.description,
            homepage: data.homepage || "",
            keywords: data.keywords ? data.keywords.join(",") : "",
            license: data.license || "",
            name: data.name,
            repository: data.repository ? data.repository.url : "",
            version: data.version,
        };

        this.qextFileBuilder.configure({
            ...data,
            ...qext,
            outDirectory: this.webpackService.getConfig().getOutDirectory(),
        });
    }

    public createQextFile() {
        const target = resolve(
                this.webpackService.getConfig().getProjectRoot(),
                this.webpackService.getConfig().getOutDirectory());

        this.qextFileBuilder.run();
    }

    private readPackageJSON(): IDataNode {
        const file = resolve(this.webpackService.getConfig().getProjectRoot(), "package.json");
        const pkgData = JSON.parse(readFileSync(file).toString());
        return pkgData;
    }
}
