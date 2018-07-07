import { resolve } from "path";
import { Config, IDataNode } from "rh-utils";
import { Compiler, Plugin } from "webpack";
import { IBuilder } from "../../api";
import { AppConfigProperties } from "../../data/app.config";
import { OptionHelper } from "../../helper";
import { WebpackOption } from "./data/webpack.options";
import { WebpackConfigModel } from "./model";
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
     * global configuration service which hold global
     * configuration values.
     *
     * @protected
     * @type {Config}
     * @memberof WebpackBuilder
     */
    protected configService: Config;

    /**
     * webpack service to add new plugins or set/get configuration
     *
     * @private
     * @type {WebpackService}
     * @memberof WebpackBuilder
     */
    private webpackService: WebpackService;

    /**
     * project root folder
     *
     * @private
     * @type {string}
     * @memberof WebpackBuilder
     */
    private projectRoot: string;

    /**
     * project source root folder
     *
     * @private
     * @type {string}
     * @memberof WebpackBuilder
     */
    private sourceRoot: string;

    /**
     * Creates an instance of WebpackBuilder.
     * @memberof WebpackBuilder
     */
    public constructor() {

        this.webpackService = WebpackService.getInstance();
        this.configService  = Config.getInstance();
        this.sourceRoot     = this.configService.get(AppConfigProperties.sourceRoot);
        this.projectRoot    = this.configService.get(AppConfigProperties.projectRoot);

        this.configureWebpack();
    }

    /**
     * configure webpack this will cause override if propertie
     * is allready set
     *
     * @param {IDataNode} config
     * @memberof WebpackBuilder
     */
    public configure(config: IDataNode): void {

        const options: IDataNode = OptionHelper.cleanOptions(config, WebpackOption);
        const errors: string[]   = OptionHelper.validateOptions(config, WebpackOption);

        if ( errors.length ) {
            throw new Error(errors.join("\n"));
        }

        Object.keys(options).forEach( (option) => {
            let value = options[option];

            if ( option === "tsConfigFile" ) {
                value = resolve(this.projectRoot, value);
            }

            if ( option === "outputDirectory" ) {
                value = resolve(this.projectRoot, value);
            }

            this.webpackService.setOption(option, value);
        });
    }

    /**
     * run webpack compiler
     *
     * @returns {Promise<string>}
     * @memberof WebpackBuilder
     */
    public async run(): Promise<string> {

        return new Promise<string>( async (success, error) => {

            /** finish some configuration values before webpack would created and runs */
            this.beforeRun();

            /** add required webpack plugins */
            this.webpackService.addPlugins( this.loadWebpackPlugins());

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
     * before compiler startes, good place to finalize configuration values
     *
     * @protected
     * @memberof WebpackBuilder
     */
    protected beforeRun(): void {
        const config = this.webpackService.getConfiguration();
        /*
        if ( config.getEnvironment() !== "production" ) {
            config.setOptimization({
                minimize: false,
            });
        }
        */
        /** @todo remove we want minimize on production mode */
        config.setOptimization({
            minimize: false,
        });
    }

    /**
     * create default configuration, override this to add / change configuration
     * properties
     *
     * @protected
     * @memberof WebpackBuilder
     */
    protected configureWebpack(): WebpackConfigModel {

        const sourceRoot  = this.sourceRoot;
        const projectRoot = this.projectRoot;

        /** @var {string} q2gBuilderSource q2g-build path in source package node_modules folder */
        const q2gBuilderSource = `${projectRoot}/node_modules/q2g-build/bin`;

        /** @var {string} q2gLoaderContext own loader paths */
        const q2gLoaderContext = resolve(q2gBuilderSource, "./lib/webpack-builder/loader");

        /** @var {string} packageName name for bundle */
        const packageName = this.configService.get(AppConfigProperties.packageName);

        const config = this.webpackService.getConfiguration();
        config.setPackageName(packageName);
        config.setContextPath(sourceRoot);
        config.setEntryFile("./index.ts");
        config.setOutputDirectory(`${projectRoot}/dist`);
        config.setOutFileName(`${packageName}.js`);
        config.setTsConfigFile( resolve(projectRoot, "./tsconfig.json"));
        config.setLoaderContextPaths([
            // vendor loader path (aka ts-loader, css-loader, ...)
            resolve(q2gBuilderSource, "../node_modules"),
            // q2g-build loader path
            q2gLoaderContext,
        ]);
        return config;
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
        const config = this.webpackService.getConfiguration();
        const plugins: Plugin[] = [
            new LogPlugin(),
            new CleanWebpackPlugin(config.getOutputDirectory(), {allowExternal: true}),
        ];
        return plugins;
    }
}
