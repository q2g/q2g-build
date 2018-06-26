import { Plugin } from "webpack";

/**
 * Webpack configuration model
 *
 * @export
 * @class WebpackConfigModel
 */
export class WebpackConfigModel {

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
     * source package name
     *
     * @private
     * @type {string}
     * @memberof WebpackConfigModel
     */
    private packageName: string;

    /**
     * webpack plugins
     *
     * @private
     * @type {Plugin[]}
     * @memberof WebpackConfigModel
     */
    private plugins: Plugin[];

    /**
     * tsconfig file path from source
     *
     * @private
     * @type {string}
     * @memberof WebpackConfigModel
     */
    private tsConfigFile: string;

    /**
     * get source directory which where the project is located
     *
     * @returns {string}
     * @memberof WebpackConfigModel
     */
    public getContextPath(): string {
        return this.contextPath;
    }

    /**
     * get entry file
     *
     * @returns {string}
     * @memberof WebpackConfigModel
     */
    public getEntryFile(): string {
        return this.entryFile;
    }

    /**
     * get context paths for loaders
     *
     * @returns {string[]}
     * @memberof WebpackConfigModel
     */
    public getLoaderContextPaths(): string[] {
        return this.loaderContextPaths;
    }

    /**
     * get output directory
     *
     * @returns {string}
     * @memberof WebpackConfigModel
     */
    public getOutputDirectory(): string {
        return this.outputDirectory;
    }

    /**
     * get output file name
     *
     * @returns {string}
     * @memberof WebpackConfigModel
     */
    public getOutFileName(): string {
        return this.outFileName;
    }

    /**
     * get output file name
     *
     * @returns {string}
     * @memberof WebpackConfigModel
     */
    public getPackageName(): string {
        return this.packageName;
    }

    /**
     * get webpack plugins
     *
     * @returns {Plugin[]}
     * @memberof WebpackConfigModel
     */
    public getPlugins(): Plugin[] {
        return this.plugins;
    }

    /**
     * get tsconfig.json for ts-loader
     *
     * @returns {string}
     * @memberof WebpackConfigModel
     */
    public getTsConfigFile(): string {
        return this.tsConfigFile;
    }

    /**
     * set output for bundle
     *
     * @param {string} dir
     * @memberof WebpackConfigModel
     */
    public setOutputDirectory(dir: string) {
        this.outputDirectory = dir;
    }

    /**
     * set entry file
     *
     * @param {string} filename
     * @memberof WebpackConfigModel
     */
    public setEntryFile(filename: string) {
        this.entryFile = filename;
    }

    /**
     * set packageName, used for out file by default
     *
     * @param {string} packageName
     * @memberof WebpackConfigModel
     */
    public setPackageName(packageName: string) {
        this.packageName = packageName;
    }

    /**
     * set tsconfig file for ts-loader
     *
     * @param {string} filepath
     * @memberof WebpackConfigModel
     */
    public setTsConfigFile(filepath: string) {
        this.tsConfigFile = filepath;
    }

    /**
     * set context path for webpack
     *
     * @param {string} contextPath
     * @memberof WebpackConfigModel
     */
    public setContextPath(contextPath: string) {
        this.contextPath = contextPath;
    }

    /**
     * set loader context paths where webpack can find our loaders
     *
     * @param {string[]} paths
     * @memberof WebpackConfigModel
     */
    public setLoaderContextPaths(paths: string[]) {
        this.loaderContextPaths = paths;
    }

    /**
     * set output filename
     *
     * @param {string} filename
     * @memberof WebpackConfigModel
     */
    public setOutFileName(filename: string) {
        this.outFileName = filename;
    }

    /**
     * set plugins used by webpack
     *
     * @param {Plugin[]} plugins
     * @memberof WebpackConfigModel
     */
    public setPlugins(plugins: Plugin[]) {
        this.plugins = plugins;
    }
}
