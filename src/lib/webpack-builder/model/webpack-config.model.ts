/**
 * Webpack configuration model
 *
 * @export
 * @class WebpackConfigModel
 */
export class WebpackConfigModel {

    /**
     * webpack configuration filename, line development.config
     * or production config
     *
     * @private
     * @type {string}
     * @memberof WebpackConfigModel
     */
    private configFile: string;

    /**
     *
     *
     * @private
     * @type {string}
     * @memberof WebpackConfigModel
     */
    private configRoot: string;

    /**
     * set context path for webpack to set directory
     * on which will be worked
     *
     * @private
     * @type {string}
     * @memberof WebpackConfigModel
     */
    private contextPath: string;

    /**
     * context paths to tell webpack where to find specific loaders
     * like ts-loader, css-loader
     *
     * @private
     * @type {string[]}
     * @memberof WebpackConfigModel
     */
    private loaderContextPaths: string[];

    /**
     * webpack entry filename default index.ts
     *
     * @private
     * @type {string}
     * @memberof WebpackConfigModel
     */
    private entryFile: string;

    /**
     * webpack out directory
     *
     * @private
     * @type {string}
     * @memberof WebpackConfigModel
     */
    private outputDirectory: string;

    /**
     * out file name where bundle is saved to
     *
     * @private
     * @type {string}
     * @memberof WebpackConfigModel
     */
    private outFileName: string;

    /**
     *
     *
     * @private
     * @type {string}
     * @memberof WebpackConfigModel
     */
    private tsConfigFile: string;

    /**
     * get directory where to find webpack configuration files
     *
     * @param {string} path
     * @memberof WebpackConfigModel
     */
    public setConfigRoot(path: string) {
        this.configRoot = path;
    }

    /**
     * get directory where to find webpack configuration files
     *
     * @returns {string}
     * @memberof WebpackConfigModel
     */
    public getConfigRoot(): string {
        return this.configRoot;
    }

    /**
     * set webpack configuration file name
     *
     * @param {string} fileName
     * @memberof WebpackConfigModel
     */
    public setConfigFile(fileName: string) {
        this.configFile = fileName;
    }

    /**
     * get webpack configuration file name
     *
     * @param {string} fileName
     * @memberof WebpackConfigModel
     */
    public getConfigFile(): string {
        return this.configFile;
    }

    /**
     * set output directory for webpack
     *
     * @param {string} dir
     * @memberof WebpackConfigModel
     */
    public setOutputDirectory(dir: string) {
        this.outputDirectory = dir;
    }

    /**
     * get output directory for webpack
     *
     * @returns {string}
     * @memberof WebpackConfigModel
     */
    public getOutputDirectory(): string {
        return this.outputDirectory;
    }

    /**
     * set entry file for webpack
     *
     * @param {string} filename
     * @memberof WebpackConfigModel
     */
    public setEntryFile(filename: string) {
        this.entryFile = filename;
    }

    /**
     * return entry file for webpack
     *
     * @returns {string}
     * @memberof WebpackConfigModel
     */
    public getEntryFile(): string {
        return this.entryFile;
    }

    /**
     * set tsconfig file
     *
     * @param {string} filepath
     * @memberof WebpackConfigModel
     */
    public setTsConfigFile(filepath: string) {
        this.tsConfigFile = filepath;
    }

    /**
     * get tsconfig file, default to tsconfig.json
     *
     * @returns {string}
     * @memberof WebpackConfigModel
     */
    public getTsConfigFile(): string {
        return this.tsConfigFile;
    }

    /**
     * set directory on which webpack should working
     *
     * @param {string} contextPath
     * @memberof WebpackConfigModel
     */
    public setContextPath(contextPath: string) {
        this.contextPath = contextPath;
    }

    /**
     * get directory on which webpack should working
     *
     * @returns {string}
     * @memberof WebpackConfigModel
     */
    public getContextPath(): string {
        return this.contextPath;
    }

    /**
     * set loader context paths
     *
     * @param {string[]} paths
     * @memberof WebpackConfigModel
     */
    public setLoaderContextPaths(paths: string[]) {
        this.loaderContextPaths = paths;
    }

    /**
     * return loader source paths
     *
     * @returns {string[]}
     * @memberof WebpackConfigModel
     */
    public getLoaderContextPaths(): string[] {
        return this.loaderContextPaths;
    }

    /**
     * returns webpack output filename
     *
     * @returns {string}
     * @memberof WebpackConfigModel
     */
    public getOutFileName(): string {
        return this.outFileName;
    }

    /**
     * set output filename for webpack bundle
     *
     * @param {string} filename
     * @memberof WebpackConfigModel
     */
    public setOutFileName(filename: string) {
        this.outFileName = filename;
    }
}
