import { existsSync } from "fs";
import { resolve } from "path";
import { IBuilder, IBuilderEnvironment } from "../../api";
import { IDataNode } from "../../api/data-node";
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

    private initialConfig: IDataNode;

    /**
     * Creates an instance of TypescriptBuilder.
     *
     * @memberof TypescriptBuilder
     */
    constructor() {
        this.typescriptService = TypescriptService.getInstance();
    }

    /**
     * config was passed
     *
     * @param {*} config
     * @memberof TypescriptBuilder
     */
    public configure(config: IDataNode): void {

        this.typescriptService.setOptions({
            ...this.initialConfig,
            ...config,
        });
    }

    /**
     * run process
     *
     * @returns {Promise<string>}
     * @memberof TypescriptBuilder
     */
    public async run(): Promise<string> {
        this.typescriptService.clearDistDirectory();

        try {
            await this.typescriptService.compileTypescriptFiles();
            await this.typescriptService.deployBinaryFiles();
            return "completed";
        } catch ( error ) {
            return error;
        }
    }

    /**
     * initialize typescript configuration
     *
     * @protected
     * @memberof TypescriptBuilder
     */
    public initialize(environment: IBuilderEnvironment) {

        const typeScriptModulePath = "node_modules/typescript/bin/tsc";
        let pathTypescriptCompiler = resolve(environment.projectRoot, `./${typeScriptModulePath}`);

        if ( ! existsSync(pathTypescriptCompiler) ) {
            pathTypescriptCompiler = resolve(environment.builderRoot, `../${typeScriptModulePath}`);
        }

        this.initialConfig = {
            typescriptCompiler: pathTypescriptCompiler,
        };
    }
}
