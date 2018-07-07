import { resolve } from "path";
import { Config, IDataNode } from "rh-utils";
import { IBuilder } from "../../api";
import { AppConfigProperties } from "../../data/app.config";
import { OptionHelper } from "../../helper";
import { Options } from "./data/options";
import { TypescriptService } from "./service/typescript.service";

/**
 * builder to compile typescript and copy
 * all binary files (html, images, fonts) to dist folder
 *
 * @export
 * @class TypescriptBuilder
 * @implements {IBuilder}
 */
export class TypescriptBuilder implements IBuilder {

    /**
     * typescript service
     *
     * @private
     * @type {TypescriptService}
     * @memberof TypescriptBuilder
     */
    private typescriptService: TypescriptService;

    /**
     * global app config
     *
     * @private
     * @type {Config}
     * @memberof TypescriptBuilder
     */
    private appConfig: Config;

    /**
     * Creates an instance of TypescriptBuilder.
     *
     * @memberof TypescriptBuilder
     */
    constructor() {
        this.appConfig  = Config.getInstance();
        this.typescriptService = TypescriptService.getInstance();
        this.initialize();
    }

    /**
     * config was passed
     *
     * @param {*} config
     * @memberof TypescriptBuilder
     */
    public configure(config: IDataNode): void {
        const options: IDataNode = OptionHelper.cleanOptions(config, Options);
        const errors: string[]   = OptionHelper.validateOptions(config, Options);

        if ( ! errors.length || Object.keys(options).length ) {
            Object.keys(options).forEach( (name) => {
                const value = options[name];
                this.typescriptService.setOption(name, value);
            });
        }
    }

    /**
     * run process
     *
     * @returns {Promise<string>}
     * @memberof TypescriptBuilder
     */
    public run(): Promise<string> {

        this.typescriptService.clearDistDirectory();

        return Promise.all([
            this.typescriptService.compileTypescriptFiles(),
            this.typescriptService.deployBinaryFiles(),
        ]).then( (result: string[]) => {
            return result.join("\n");
        });
    }

    /**
     * initialize typescript configuration
     *
     * @protected
     * @memberof TypescriptBuilder
     */
    protected initialize() {

        const appRoot     = this.appConfig.get(AppConfigProperties.appRoot);
        const config      = this.typescriptService.getConfig();

        config.setTypescriptCompiler(resolve(appRoot, "../node_modules/typescript/lib/tsc"));
    }
}
