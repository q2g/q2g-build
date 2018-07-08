import { ChildProcess, spawn} from "child_process";
import { resolve } from "path";
import { IDataNode } from "rh-utils";
import { DeployHelper } from "../../../helper";
import { TscConfigModel } from "../model/typescript.config.model";
import { TscConfigService } from "./tsc-config.service";

export class TypescriptService  {

    public static getInstance(): TypescriptService {
        return this.instance;
    }

    private static instance: TypescriptService = new TypescriptService();

    private configModel: TscConfigModel;

    private configService: TscConfigService;

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

        this.configService = new TscConfigService();
        this.configModel   = this.configService.getConfig();
        TypescriptService.instance = this;
    }

    public setOptions(config: IDataNode) {
        this.configService.setOptions(config);
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
        DeployHelper.removeDirectory(this.configModel.getOutDirectory());
    }

    /**
     * deploy binary files like html, less into dist directory
     *
     * @returns {Promise<string>}
     * @memberof TypescriptService
     */
    public deployBinaryFiles(): Promise<string> {

        const sourceDir = this.configModel.getProjectSource();
        const targetDir = this.configModel.getOutDirectory();

        this.configModel.setExcludeNcp(
            this.configModel.getExcludeNcp().concat([".ts", ".tsx", "d.ts"]));

        const filesToExclude = DeployHelper.createNcpExcludeRegExp(this.configModel.getExcludeNcp());
        return DeployHelper.copyFiles( sourceDir, targetDir, filesToExclude);
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
            this.configModel.getTypescriptCompiler(),
            "--project", this.configModel.getTsConfigFile(),
            "--outDir",  this.configModel.getOutDirectory(),
            "--rootDir", this.configModel.getProjectSource(),
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
