export class ConfigModel {

    /**
     * exclude from node copy process
     *
     * @private
     * @type {string[]}
     * @memberof ConfigModel
     */
    private excludeNcp: string[];

    /**
     * path to typescript compiler
     *
     * @private
     * @type {string}
     * @memberof ConfigModel
     */
    private typescriptCompiler: string;

    /**
     * output directory
     *
     * @private
     * @type {string}
     * @memberof ConfigModel
     */
    private outDirectory: string;

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
     * exclude patterns for node copy
     *
     * @returns {string[]}
     * @memberof ConfigModel
     */
    public getExcludeNcp(): string[] {
        return this.excludeNcp;
    }

    /**
     * get path to typescript compiler
     *
     * @returns {string}
     * @memberof ConfigModel
     */
    public getTypescriptCompiler(): string {
        return this.typescriptCompiler;
    }

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
     * set exclude patterns for node copy
     *
     * @param {string[]} patterns
     * @memberof ConfigModel
     */
    public setExcludeNcp(patterns: string[]) {
        this.excludeNcp = patterns;
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

    /**
     * set path to typescript compiler
     *
     * @param {string} path
     * @memberof ConfigModel
     */
    public setTypescriptCompiler(path: string) {
        this.typescriptCompiler = path;
    }
}
