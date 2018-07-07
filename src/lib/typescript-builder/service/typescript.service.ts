import { ChildProcess, spawn} from "child_process";
import { resolve, sep as pathDelimeter } from "path";
import { DeployHelper } from "../../../helper";
import { ConfigModel } from "../model/config.model";

export class TypescriptService {

    public static getInstance(): TypescriptService {
        return this.instance;
    }

    private static instance: TypescriptService = new TypescriptService();

    /**
     * typescript builder configuration
     *
     * @private
     * @type {ConfigModel}
     * @memberof TypescriptService
     */
    private config: ConfigModel;

    /**
     * Creates an instance of TypescriptService.
     *
     * @memberof TypescriptService
     */
    constructor() {

        if ( TypescriptService.instance ) {
            throw new Error(`could not create instance of TypescriptService,
            use TypescriptService.getInstance() instead`);
        }

        this.config = new ConfigModel();
        TypescriptService.instance = this;
    }

    /**
     * set typescript builder option
     *
     * @param {string} option
     * @param {string} value
     * @memberof WebpackService
     */
    public setOption(option: string, value: string) {

        const setterMethod = `set${option.charAt(0).toUpperCase()}${option.slice(1)}`;
        const methodExists = Object.prototype.toString.call(
            this.config[setterMethod]).slice(8, -1) === "Function";

        if ( methodExists ) {
            this.config[setterMethod](value);
        }
    }

    /**
     * get typescript builder configuration
     *
     * @returns {ConfigModel}
     * @memberof TypescriptService
     */
    public getConfig(): ConfigModel {
        return this.config;
    }

    /**
     * compile typescript files
     *
     * @returns {Promise<string>}
     * @memberof TypescriptService
     */
    public compileTypescriptFiles(): Promise<string> {
        return new Promise( (success, error) => {
            const process: ChildProcess = this.createTsProcess();
            let tsOut: string = "";

            process.stdout.on("data", (chunk: Buffer) => {
                tsOut = tsOut.concat(chunk.toString());
            });

            process.on("close", () => {
                if ( this.hasError(tsOut) ) {
                    return error(tsOut);
                }
                return success(tsOut);
            });
        });
    }

    /**
     * clear dist directory
     *
     * @memberof TypescriptService
     */
    public clearDistDirectory(): void {
        const rootDir = this.config.getProjectRoot();
        const distDir = this.config.getOutDirectory();
        DeployHelper.removeDirectory(resolve(rootDir, distDir));
    }

    /**
     * deploy binary files like html, less into dist directory
     *
     * @returns {Promise<string>}
     * @memberof TypescriptService
     */
    public deployBinaryFiles(): Promise<string> {

        const rootDir   = this.config.getProjectRoot();
        const sourceDir = this.config.getProjectSource();
        const targetDir = this.config.getOutDirectory();

        this.config.setExcludeNcp(
            this.config.getExcludeNcp().concat([".ts", ".tsx", "d.ts"]));

        const filesToExclude = DeployHelper.createNcpExcludeRegExp(this.config.getExcludeNcp());
        return DeployHelper.copyFiles( sourceDir, resolve(rootDir, targetDir), filesToExclude);
    }

    /**
     * create new child process and running type script compiler
     * on specific directory
     *
     * @returns {ChildProcess}
     * @memberof TypescriptService
     */
    private createTsProcess(): ChildProcess {
        const process: ChildProcess = spawn("node", [
            this.config.getTypescriptCompiler(),
            "--project", resolve( this.config.getProjectRoot(), this.config.getTsConfigFile() ),
            "--outDir",  resolve( this.config.getProjectRoot(), this.config.getOutDirectory() ),
            "--rootDir", this.config.getProjectSource(),
        ], {
            stdio: [ "pipe" ], // pipe childprocess stdio channels to nodejs
        });
        return process;
    }

    /**
     * check typescript response got an error
     *
     * @private
     * @param {string} tsData
     * @returns {boolean}
     * @memberof TypescriptBuilder
     */
    private hasError(tsData: string): boolean {
        if ( tsData.match(/^error/) ) {
            return true;
        }
        return false;
    }
}
