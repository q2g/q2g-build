import { resolve } from "path";
import { Config, IDataNode } from "rh-utils";
import { IBuilderEnvironment } from "../../api";
import { AbstractBuilder } from "../abstract.builder";
import { TypescriptService } from "./service/typescript.service";

/**
 * builder to compile typescript and copy
 * all binary files (html, images, fonts) to dist folder
 *
 * @export
 * @class TypescriptBuilder
 * @implements {IBuilder}
 */
export class TypescriptBuilder extends AbstractBuilder {

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
        super();
        this.appConfig  = Config.getInstance();
        this.typescriptService = TypescriptService.getInstance();
    }

    /**
     * config was passed
     *
     * @param {*} config
     * @memberof TypescriptBuilder
     */
    public configure(config: IDataNode): void {
        this.typescriptService.setOptions(config);
    }

    /**
     * run process
     *
     * @returns {Promise<string>}
     * @memberof TypescriptBuilder
     */
    public async run(): Promise<string> {

        this.typescriptService.clearDistDirectory();

        await this.typescriptService.compileTypescriptFiles();
        await this.typescriptService.deployBinaryFiles();

        return "nice one";
    }

    /**
     * initialize typescript configuration
     *
     * @protected
     * @memberof TypescriptBuilder
     */
    public initialize(environment: IBuilderEnvironment) {

        super.initialize(environment);
        const tscConfig = {
            typescriptCompiler: resolve(environment.builderRoot, "../node_modules/typescript/bin/tsc"),
        };
        this.typescriptService.setOptions(tscConfig);
    }
}
