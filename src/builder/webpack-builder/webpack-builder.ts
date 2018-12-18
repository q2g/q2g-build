import { basename, resolve } from "path";
import * as UglifyJSPlugin from "uglifyjs-3-webpack-plugin";
import { Compiler, Module, Plugin } from "webpack";
import { IBuilder, IBuilderEnvironment } from "../../api";
import { IDataNode } from "../../api/data-node";
import { WebpackConfigModel } from "./model/webpack-config.model";
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
    public configure(config: any): void {

        /** hotfix rewrite entry file to be an object, se we can apply multiple entry files */
        const entryFile = {};
        entryFile[config.outFileName || basename(config.entryFile, "ts")] = config.entryFile;
        config.entryFile = entryFile;

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

        const settings = this.webpackService.getConfig();
        this.initialConfig = this.getInitialConfig(environment);

        // set context paths were to watch for webpack plugins / loader
        settings.setLoaderContextPaths([
            resolve(__dirname, "./loader"),                     // own loaders
            resolve(environment.builderRoot, "./node_modules"), // loaders in node_modules folder from q2g-build
            resolve(environment.projectRoot, "./node_modules"), // loaders in project root node_modules folder
        ]);
        settings.setPackageName(environment.projectName);
    }

    public get settings(): WebpackConfigModel {
        return this.webpackService.getConfig();
    }

    /**
     * run webpack compiler
     *
     * @returns {Promise<string>}
     * @memberof WebpackBuilder
     */
    public async run(): Promise<any> {
        await this.beforeRun();

        const compiler: Compiler = await this.webpackService.getWebpack();
        const webPackConfig      = this.webpackService.getConfig();
        const watch              = webPackConfig.getWatch() && webPackConfig.getEnvironment() === "development";

        return new Promise(async (finalize, reject) => {
            /** handler if build has finished */
            const handler: Compiler.Handler = (err) => {
                if (err) {
                    process.stderr.write(err.toString());
                    if (!watch) {
                        reject();
                    }
                }

                process.stdout.write(`Build finished: ${webPackConfig.getPackageName()}\n\n`);
                if (!watch) {
                    finalize();
                }
            };

            if (watch) {
                const watchOptions: Compiler.WatchOptions = {
                    ignored: ["**/*.js", "**/node_modules"],
                };
                /** start watch mode */
                compiler.watch(watchOptions, handler);
            } else {
                compiler.run(handler);
            }
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

        const env = this.webpackService.getConfig().getEnvironment();
        const envConfig = {
            optimization: {
                minimize: env === "production" ? true : false,
                minimizer: [
                    new UglifyJSPlugin({
                        uglifyOptions: {
                            mangle: false,
                        },
                    }),
                ],
            },
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
        initialConfig.outFileName = `${environment.projectName}.js`;
        initialConfig.environment = environment.environment || "development";
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
