import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

export class PackageJsonWriter {

    /**
     * returns instance from PackageJsonWriter
     *
     * @static
     * @returns {PackageJsonWriter}
     * @memberof PackageJsonWriter
     */
    public static getInstance(): PackageJsonWriter {
        return PackageJsonWriter.instance;
    }

    /**
     * instance of PackageJsonWriter
     *
     * @private
     * @static
     * @type {PackageJsonWriter}
     * @memberof PackageJsonWriter
     */
    private static instance: PackageJsonWriter = new PackageJsonWriter();

    /**
     * package.json file
     *
     * @private
     * @type {string}
     * @memberof PackageJsonWriter
     */
    private packageJsonFile: string;

    /**
     * Creates an instance of PackageJsonWriter.
     * @memberof PackageJsonWriter
     */
    private constructor() {
        if (PackageJsonWriter.instance) {
            throw new Error("Could not create instance of PackageJsonWriter.\
                Use PackageJsonWriter.getInstance() instead.");
        }
        PackageJsonWriter.instance = this;

        this.packageJsonFile = resolve(process.cwd(), "./package.json");
    }

    /**
     * write data to package.json if property allready
     * exists it will merged with existing data and override
     * if property allready exists.
     *
     * @param {*} property
     * @param {*} data
     * @memberof PackageJsonWriter
     */
    public write(property, data) {

        // fetch packageJsonData
        const content = JSON.parse(readFileSync(this.packageJsonFile, {encoding: "utf8"}));

        if (!content.hasOwnProperty(property)) {
            content[property] = data;
        } else {
            content[property] = {...content[property], ...data};
        }

        // write file
        writeFileSync(this.packageJsonFile, `${JSON.stringify(content, null, 2)}\n`, { encoding: "utf8"});
    }
}
