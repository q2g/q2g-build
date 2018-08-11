import { existsSync, lstatSync, PathLike, readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { IDataNode } from "../../api/data-node";
import { IQextData } from "./api";
import { MANDATORY_PROPERTIES, QEXT_PROPERTIES } from "./data/qext-properties";
import { QextModel } from "./model/qext.model";

export class QextFileGenerator {

    private model: IQextData;

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
        /*
        const data     = this.toJson();
        const fileName = `${this.model.name}.qext`;
        const filePath = resolve(path, fileName);

        const stats = lstatSync(path);

        if ( ! path || stats.isDirectory() ) {
            // throw new QextCouldNotWriteFileException(`given path ${path} is not a directory.`);
        }

        writeFileSync(filePath, data, { encoding: "utf8" });
        */
    }

    private extractData(data: IDataNode) {

        Object.keys(QEXT_PROPERTIES).forEach( (property: any) => {

            const prop  = QEXT_PROPERTIES[property];
            const value = data[prop];

            let isValid: boolean = true;

            if ( this.isMandatory(prop) ) {
                isValid = isValid && this.isNotUndefined(value, prop);
                isValid = isValid && this.isString(value, prop);
                isValid = isValid && this.isNotEmpty(value, prop);
            }

            if ( isValid ) {
                this.model[prop] = value;
            }
        });
    }

    /**
     * checks property is mandatory for extension
     *
     * @private
     * @param {string} prop
     * @returns {boolean}
     * @memberof QextFileGenerator
     */
    private isMandatory(prop: string): boolean {
        return MANDATORY_PROPERTIES.indexOf(prop as any) > -1;
    }

    /**
     * checks value is set in extension configuration
     *
     * @private
     * @param {string} prop
     * @memberof QextFileGenerator
     */
    private isNotUndefined(val: string, prop: string): boolean {
        if ( val === undefined) {
            throw new Error(`Missing mandatory property: ${prop}`);
        }
        return true;
    }

    /**
     * checks property value is string
     *
     * @private
     * @param {string} prop
     * @memberof QextFileGenerator
     */
    private isString(val: string, prop: string): boolean {
        if ( ! val as any instanceof String ) {
            throw new Error(`Mandatory property ${val} must be a string.`);
        }
        return true;
    }

    /**
     * checks property value is not empty
     *
     * @private
     * @param {string} prop
     * @memberof QextFileGenerator
     */
    private isNotEmpty(val: string, prop: string): boolean {
        if ( val.replace(/(^\s*|\s*$)/gm, "") === "" ) {
            throw new Error(`Mandatory property ${prop} could not be empty.`);
        }
        return true;
    }
}
