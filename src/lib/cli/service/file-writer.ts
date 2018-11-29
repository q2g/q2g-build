import { existsSync, writeFileSync } from "fs";
import { resolve } from "path";

export class FileWriter {

    /**
     * returns instance from PackageJsonWriter
     *
     * @static
     * @returns {PackageJsonWriter}
     * @memberof PackageJsonWriter
     */
    public static getInstance(): FileWriter {
        return FileWriter.instance;
    }

    /**
     * instance of PackageJsonWriter
     *
     * @private
     * @static
     * @type {PackageJsonWriter}
     * @memberof PackageJsonWriter
     */
    private static instance: FileWriter = new FileWriter();

    /**
     * Creates an instance of PackageJsonWriter.
     * @memberof PackageJsonWriter
     */
    private constructor() {
        if (FileWriter.instance) {
            throw new Error("Could not create instance of PackageJsonWriter.\
                Use PackageJsonWriter.getInstance() instead.");
        }
        FileWriter.instance = this;
    }

    /**
     *
     *
     * @param {*} property
     * @param {*} data
     * @memberof FileWriter
     */
    public write(filename, data) {
        const filePath = resolve(process.cwd(), filename);

        if (!existsSync(filePath)) {
            this.createAndWriteFile(filePath, data);
            return;
        }

        /** @todo implement we can update a file */
        this.createAndWriteFile(filePath, data);
    }

    /**
     * create and write data to file
     *
     * @private
     * @param {string} path
     * @memberof FileWriter
     */
    private createAndWriteFile(path: string, data: string) {
        writeFileSync(path, data, {encoding: "utf8", flag: "w"});
    }
}
