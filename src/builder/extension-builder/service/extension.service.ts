import { readFileSync } from "fs";
import { resolve } from "path";
import { IDataNode } from "../../../api/data-node";
import { QextFileGenerator } from "../../../lib/qext-generator";
import { WebpackService } from "../../webpack-builder/service/webpack.service";

export class ExtensionService {

    private webpackService: WebpackService;

    private qextFileGenerator: QextFileGenerator;

    public constructor() {
        this.webpackService    = WebpackService.getInstance();
        this.qextFileGenerator = new QextFileGenerator();
    }

    public initializeQextData() {
        let data = this.readPackageJSON();

        if ( data.repository && typeof data.repository  !== "string" ) {
            data.repository = data.repository.url;
        }

        if ( ! data.hasOwnProperty("qext") ) {
            data.qext = {};
        }

        data = { ...data, ...data.qext };
        delete data.qext;

        this.qextFileGenerator.loadData(data);
    }

    public createQextFile() {

        const target = resolve(
                this.webpackService.getConfig().getProjectRoot(),
                this.webpackService.getConfig().getOutDirectory());

        this.qextFileGenerator.createFile(target);
    }

    private readPackageJSON(): IDataNode {
        const file = resolve(this.webpackService.getConfig().getProjectRoot(), "package.json");
        const pkgData = JSON.parse(readFileSync(file).toString());
        return pkgData;
    }
}
