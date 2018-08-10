import { existsSync, PathLike, readFileSync} from "fs";
import { IDataNode } from "../../../../../api/data-node";
import { QextModel } from "../model/qext.model";

export class QextFileService {

    public static getInstance(): QextFileService {
        return QextFileService.instance;
    }

    private static instance: QextFileService = new QextFileService();

    private model: QextModel;

    private constructor() {
        if ( QextFileService.instance ) {
            throw new Error(`could not create instance from QextFileService.
             Use QextFileService.getInstance() instead.`);
        }
        QextFileService.instance = this;
        this.model = new QextModel();
    }

    /**
     * load data from given json file or data source
     *
     * @param {(PathLike | IDataNode)} pkgData
     * @memberof QextFileService
     */
    public loadPackageData(pkgData: PathLike | IDataNode): void {

        let packageData: IDataNode = {};

        if ( typeof pkgData === "string" && existsSync(pkgData) ) {
            const content = readFileSync(pkgData).toString("utf8");
            packageData   = JSON.parse(content);
        } else {
            packageData = pkgData as IDataNode;
        }

        // @todo read all properties from specific
        // package.json data field could be named qext
        // loop through all properties and extract all properties which are mandatory
        // some properties could not found in package.json like author, description and so on
        // so it musts exists in qext, if not throw an error
    }

    public createQextFile(target: string): boolean {
    }
}
