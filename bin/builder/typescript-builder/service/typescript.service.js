"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const helper_1 = require("../../../helper");
const tsc_config_service_1 = require("./tsc-config.service");
class TypescriptService {
    constructor() {
        if (TypescriptService.instance) {
            throw new Error(`could not create instance of TypescriptService,
            use TypescriptService.getInstance() instead`);
        }
        this.configService = new tsc_config_service_1.TscConfigService();
        this.configModel = this.configService.getConfig();
        TypescriptService.instance = this;
    }
    static getInstance() {
        return this.instance;
    }
    setOptions(config) {
        this.configService.setOptions(config);
    }
    compileTypescriptFiles() {
        return new Promise((success, error) => {
            const process = this.createTsProcess();
            let tsOut = "";
            process.stdout.on("data", (chunk) => {
                tsOut = tsOut.concat(chunk.toString());
            });
            process.on("close", () => {
                if (this.hasError(tsOut)) {
                    return error(tsOut);
                }
                return success(tsOut);
            });
        });
    }
    clearDistDirectory() {
        helper_1.DeployHelper.removeDirectory(this.configModel.getOutDirectory());
    }
    deployBinaryFiles() {
        const sourceDir = this.configModel.getProjectSource();
        const targetDir = this.configModel.getOutDirectory();
        this.configModel.setExcludeNcp(this.configModel.getExcludeNcp().concat([".ts", ".tsx", "d.ts"]));
        const filesToExclude = helper_1.DeployHelper.createNcpExcludeRegExp(this.configModel.getExcludeNcp());
        return helper_1.DeployHelper.copyFiles(sourceDir, targetDir, filesToExclude);
    }
    createTsProcess() {
        const process = child_process_1.spawn("node", [
            this.configModel.getTypescriptCompiler(),
            "--project", this.configModel.getTsConfigFile(),
            "--outDir", this.configModel.getOutDirectory(),
            "--rootDir", this.configModel.getProjectSource(),
        ], {
            stdio: ["pipe", "pipe", "inherit"],
        });
        return process;
    }
    hasError(tsData) {
        if (tsData.match(/^error/)) {
            return true;
        }
        return false;
    }
}
TypescriptService.instance = new TypescriptService();
exports.TypescriptService = TypescriptService;
