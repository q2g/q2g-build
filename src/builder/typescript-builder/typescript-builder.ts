import { existsSync } from "fs";
import { resolve } from "path";
import { IBuilderEnvironment } from "../../api";
import { IDataNode } from "../../api/data-node";
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
     * Creates an instance of TypescriptBuilder.
     *
     * @memberof TypescriptBuilder
     */
    constructor() {
        super();
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

        super.initialize(environment);

        const typeScriptModulePath = "node_modules/typescript/bin/tsc";
        let pathTypescriptCompiler = resolve(environment.projectRoot, `./${typeScriptModulePath}`);

        if ( ! existsSync(pathTypescriptCompiler) ) {
            pathTypescriptCompiler = resolve(environment.builderRoot, `../${typeScriptModulePath}`);
        }

        const tscConfig = {
            typescriptCompiler: pathTypescriptCompiler,
        };

        this.typescriptService.setOptions(tscConfig);
    }
}
