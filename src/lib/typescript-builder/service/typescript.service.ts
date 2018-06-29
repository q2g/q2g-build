import { ChildProcess, spawn} from "child_process";
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
     * create new child process and running type script compiler
     * on specific directory
     *
     * @returns {ChildProcess}
     * @memberof TypescriptService
     */
    public createTsProcess(): ChildProcess {
        const process: ChildProcess = spawn("node", [
            this.config.getNodePackageTS(),
            "--p",  `${this.config.getProjectSource()}/${this.config.getTsConfigFile() || "tsconfig.json"}`,
        ], {
            stdio: [ "pipe" ], // pipe childprocess stdio channels to nodejs
        });
        return process;
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
}
