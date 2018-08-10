import { existsSync, lstatSync, PathLike, readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { IDataNode } from "../../api/data-node";
import { IQextData } from "./api";
import { QextCouldNotWriteFileException, QextMandatoryException } from "./data/exception";
import { MANDATORY_PROPERTIES, QEXT_PROPERTIES } from "./data/qext-properties";
import { QextModel } from "./model/qext.model";

export class QextFileGenerator {

    private model: QextModel;

    constructor() {
        this.model = new QextModel();
    }

    /**
     * load data from given json file or data source
     *
     * @param {(PathLike | IDataNode)} pkgData
     * @param {string} root where to find all properties
     * @memberof QextFileService
     */
    public loadData(pkgData: PathLike | IDataNode, root = "qext"): void {

        let packageData: IDataNode = {};

        if ( typeof pkgData === "string" && existsSync(pkgData) ) {
            const content = readFileSync(pkgData).toString("utf8");
            packageData   = JSON.parse(content);
        } else {
            packageData = pkgData as IDataNode;
        }

        this.extractData(packageData);
    }

    public createFile(path: string) {
        const data     = this.toJson();
        const fileName = `${this.model.name}.qext`;
        const filePath = resolve(path, fileName);

        const stats = lstatSync(path);

        if ( ! path || stats.isDirectory() ) {
            throw new QextCouldNotWriteFileException(`given path ${path} is not a directory.`);
        }

        writeFileSync(filePath, data, { encoding: "utf8" });
    }

    private toJson(): IQextData {
        const data = {};
        Object.keys(QEXT_PROPERTIES).forEach( (property) => {
            data[property] = this.model[property];
        });
        return data as IQextData;
    }

    private extractData(data: IDataNode) {

        const source: IDataNode = data;

        Object.keys(QEXT_PROPERTIES).forEach( (property: string) => {

            const prop        = QEXT_PROPERTIES[property];
            const isMandatory = MANDATORY_PROPERTIES.indexOf(QEXT_PROPERTIES[property]) > -1;
            const propVal     = source[prop];

            if ( isMandatory && ! propVal ) {
                throw new QextMandatoryException(`Missing mandatory property: ${prop}`);
            }

            if ( ! propVal ) {
                return;
            }

            this.model[prop] = propVal;
        });
    }
}
