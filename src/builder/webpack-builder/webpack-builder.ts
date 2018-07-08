import { resolve } from "path";
import { IDataNode } from "rh-utils";
import { Compiler, Plugin } from "webpack";
import { IBuilderEnvironment } from "../../api";
import { AbstractBuilder } from "../abstract.builder";
import { CleanWebpackPlugin, LogPlugin } from "./plugins";
import { WebpackService } from "./service/webpack.service";

/**
 * builder for webpack to bundle all files
 *
 * @export
 * @class WebpackBuilder
 * @implements {IBuilder}
 */
export class WebpackBuilder extends AbstractBuilder {

    /**
     * webpack service to add new plugins or set/get configuration
     *
     * @private
     * @type {WebpackService}
     * @memberof WebpackBuilder
     */
    protected webpackService: WebpackService;

    /**
     * project root folder
     *
     * @private
     * @type {string}
     * @memberof WebpackBuilder
     */
    private projectRoot: string;

    /**
     * Creates an instance of WebpackBuilder.
     * @memberof WebpackBuilder
     */
    public constructor() {

        super();
        this.webpackService = WebpackService.getInstance();
    }

    /**
     * configure webpack this will cause override if propertie
     * is allready set
     *
     * @param {IDataNode} config
     * @memberof WebpackBuilder
     */
    public configure(config: IDataNode): void {
        this.webpackService.setOptions(config);
        this.webpackService.setOptions( {plugins: this.loadWebpackPlugins() }, false);
    }

    /**
     * initialize typescript configuration
     *
     * @protected
     * @memberof TypescriptBuilder
     */
    public initialize(environment: IBuilderEnvironment) {
        super.initialize(environment);

        const env = environment.environment;

        // set values without validation
        const webpackConfiguration = {
            entryFile: "./index.ts",
            loaderContextPaths: [
                resolve(environment.builderRoot, "./builder/webpack-builder/loader"),
                resolve(environment.builderRoot, "../node_modules"),
            ],
            optimization: {
                minimize: env === "production" ? true : false,
            },
            outFileName: `${environment.projectName}.js`,
            packageName: environment.projectName,
        };

        this.webpackService.setOptions(webpackConfiguration, false);
    }

    /**
     * run webpack compiler
     *
     * @returns {Promise<string>}
     * @memberof WebpackBuilder
     */
    public async run(): Promise<string> {
        return new Promise<string>( async (success, error) => {
            /** create compiler */
            const compiler: Compiler = await this.webpackService.getWebpack();

            compiler.run((err) => {
                if ( err ) {
                    process.stderr.write(err.toString());
                    error(err);
                }
                success("completed");
            });
        });
    }

    /**
     * add webpack plugins before we start since configuration
     * values can be changed by other builders which extends from
     * webpack-builder or loaded by configuration file
     *
     * @protected
     * @returns {Plugin[]}
     * @memberof WebpackBuilder
     */
    protected loadWebpackPlugins(): Plugin[] {

        const outDir = this.webpackService.getConfig().getOutDirectory();

        const plugins: Plugin[] = [
            new LogPlugin(),
            new CleanWebpackPlugin(outDir, {allowExternal: true}),
        ];
        return plugins;
    }
}
