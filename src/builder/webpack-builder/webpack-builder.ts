import { resolve } from "path";
import { Compiler, Module, Plugin } from "webpack";
import { IBuilder, IBuilderEnvironment } from "../../api";
import { IDataNode } from "../../api/data-node";
import { IWebpackConfig } from "./api/config.interface";
import { CleanWebpackPlugin, LogPlugin } from "./plugins";
import { WebpackService } from "./service/webpack.service";

/**
 * builder for webpack to bundle all files
 *
 * @export
 * @class WebpackBuilder
 * @implements {IBuilder}
 */
export class WebpackBuilder implements IBuilder {

    /**
     * webpack service to add new plugins or set/get configuration
     *
     * @private
     * @type {WebpackService}
     * @memberof WebpackBuilder
     */
    protected webpackService: WebpackService;

    private initialConfig: IDataNode;

    /**
     * Creates an instance of WebpackBuilder.
     * @memberof WebpackBuilder
     */
    public constructor() {
        this.webpackService = WebpackService.getInstance();
    }

    /**
     * configure webpack this will cause override if propertie
     * is allready set
     *
     * @param {IDataNode} config
     * @memberof WebpackBuilder
     */
    public configure(config: IWebpackConfig): void {
        this.webpackService.setOptions({
            ...this.initialConfig,
            ...config,
        });
    }

    /**
     * initialize typescript configuration
     *
     * @protected
     * @memberof TypescriptBuilder
     */
    public initialize(environment: IBuilderEnvironment) {

        const env = environment.environment;
        const settings = this.webpackService.getConfig();

        this.initialConfig = this.getInitialConfig(environment);

        // set context paths were to watch for webpack plugins / loader
        settings.setLoaderContextPaths([
            resolve(environment.builderRoot, "./dist/builder/webpack-builder/loader"),
            resolve(environment.builderRoot, "./builder/webpack-builder/loader"),
            resolve(environment.builderRoot, "./node_modules"),
            resolve(environment.projectRoot, "./node_modules"),
        ]);
        settings.setPackageName(environment.projectName);
    }

    /**
     * run webpack compiler
     *
     * @returns {Promise<string>}
     * @memberof WebpackBuilder
     */
    public async run(): Promise<string> {

        await this.beforeRun();

        return new Promise<string>( async (success, error) => {
            /** create compiler */
            const compiler: Compiler = await this.webpackService.getWebpack();

            compiler.run((err) => {
                if ( err ) {
                    process.stderr.write(err.toString());
                    error(err);
                }
                this.completed();
                success("completed");
            });
        });
    }

    /**
     * before webpack runs finalize webpack configuration
     * and load required plugins
     *
     * @protected
     * @memberof WebpackBuilder
     */
    protected async beforeRun() {
        const env = this.webpackService.getConfig().getEnvrionment();
        const envConfig = {
            optimization: {
                minimize: env === "production" ? true : false,
            },
            webpackEnvrionment: env === "debug" ? "none" : env,
        };

        this.webpackService.getConfig().moduleRules = await this.loadModuleRules();
        this.webpackService.addPlugins(this.loadWebpackPlugins());
        this.webpackService.setOptions(envConfig, true);
    }

    /**
     * called after build process completed
     */
    // tslint:disable-next-line:no-empty
    protected completed() {}

    /**
     * get initial webpack configuration, this will merged with outer configuration
     * for builder.
     *
     * @protected
     * @param {IBuilderEnvironment} environment
     * @returns {IDataNode}
     * @memberof WebpackBuilder
     */
    protected getInitialConfig(environment: IBuilderEnvironment): IDataNode {
        const initialConfig: IDataNode = environment;
        initialConfig.entryFile   = "./index.ts";
        initialConfig.outFileName = `${environment.projectName}.js`;
        return initialConfig;
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

    /**
     * load module rules for webpack
     *
     * @protected
     * @returns {Promise<IDataNode>}
     * @memberof WebpackBuilder
     */
    protected async loadModuleRules(): Promise<Module> {
        const moduleRules: any = await import("./templates/module-rules.config");
        return moduleRules.default;
    }
}
