import { resolve } from "path";
import { Config, IDataNode } from "rh-utils";
import { Compiler, Plugin } from "webpack";
import { IBuilder } from "../../api";
import { AppConfigProperties } from "../../model";
import { OptionHelper } from "../../services";
import { WebpackConfigModel, WebpackOption } from "./model";
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
     * source root path
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

        if ( ! errors.length ) {
            for (const name in options) {
                if ( options.hasOwnProperty(name) ) {
                    this.webpackService.setOption(name, options[name]);
                }
            }
        }
    }

    /**
     * run webpack compiler
     *
     * @memberof WebpackBuilder
     */
    public async run() {
        const compiler: Compiler = await this.webpackService.getWebpack();
        this.beforeRun();
        this.webpackService.addPlugins( this.loadWebpackPlugins());
        compiler.run((err) => {
            if ( err ) {
                process.stderr.write(err.toString());
            }
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
        if ( config.getEnvironment() !== "production" ) {
            config.setOptimization({
                minimize: false,
            });
        }
    }

    /**
     * create default configuration, override this to add / change configuration
     * properties
     *
     * @protected
     * @memberof WebpackBuilder
     */
    protected configureWebpack(): WebpackConfigModel {

        const sourceRoot = this.sourceRoot;

        /** @var {string} q2gBuilderSource q2g-build path in source package node_modules folder */
        const q2gBuilderSource = `${sourceRoot}/node_modules/q2g-build/bin`;

        /** @var {string} q2gLoaderContext own loader paths */
        const q2gLoaderContext = resolve(q2gBuilderSource, "./lib/webpack-builder/loader");

        /** @var {string} packageName name for bundle */
        const packageName = this.configService.get(AppConfigProperties.packageName);

        const config = this.webpackService.getConfiguration();
        config.setPackageName(packageName);
        config.setContextPath(sourceRoot);
        config.setEntryFile("./index.ts");
        config.setOutputDirectory(`${sourceRoot}/dist`);
        config.setOutFileName(`${packageName}.js`);
        config.setTsConfigFile(`${sourceRoot}/tsconfig.json`);
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
