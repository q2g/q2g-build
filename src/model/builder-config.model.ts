export class BuilderConfigModel {

    /**
     * output directory
     *
     * @private
     * @type {string}
     * @memberof ConfigModel
     */
    private outDirectory: string;

    /**
     * project root directory
     *
     * @private
     * @type {string}
     * @memberof ConfigModel
     */
    private projectRoot: string;

    /**
     * project source directory
     *
     * @private
     * @type {string}
     * @memberof ConfigModel
     */
    private projectSource: string;

    /**
     * typescript configuration file
     *
     * @private
     * @type {string}
     * @memberof ConfigModel
     */
    private tsConfigFile: string;

    /**
     * get output directory where to deploy all files
     *
     * @returns {string}
     * @memberof ConfigModel
     */
    public getOutDirectory(): string {
        return this.outDirectory;
    }

    /**
     * return project root directory
     *
     * @returns {string}
     * @memberof ConfigModel
     */
    public getProjectRoot(): string {
        return this.projectRoot;
    }

    /**
     * get project source directory
     *
     * @returns {string}
     * @memberof ConfigModel
     */
    public getProjectSource(): string {
        return this.projectSource;
    }

    /**
     * get typescript configuration file path
     *
     * @returns {string}
     * @memberof ConfigModel
     */
    public getTsConfigFile(): string {
        return this.tsConfigFile;
    }

    /**
     * set output directory for typescript and files to deploy
     *
     * @param {string} path
     * @memberof ConfigModel
     */
    public setOutDirectory(path: string) {
        this.outDirectory = path;
    }

    /**
     * set project root directory
     *
     * @param {string} path
     * @memberof ConfigModel
     */
    public setProjectRoot(path: string) {
        this.projectRoot = path;
    }

    /**
     * set project root source
     *
     * @param {string} path
     * @memberof ConfigModel
     */
    public setProjectSource(path: string) {
        this.projectSource = path;
    }

    /**
     * set typescript configuration file path used for typescript compiler
     *
     * @param {string} fileName
     * @memberof ConfigModel
     */
    public setTsConfigFile(fileName: string) {
        this.tsConfigFile = fileName;
    }
}
