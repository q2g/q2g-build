import { Config } from "rh-utils";
import * as Webpack from "webpack";
import { WebpackConfigModel } from "../model/webpack-config.model";

export class WebpackService {

    public static instance: WebpackService = new WebpackService();

    public static getInstance() {
        return this.instance;
    }

    /**
     * webpack config model
     *
     * @private
     * @type {WebpackConfigModel}
     * @memberof WebpackService
     */
    private configModel: WebpackConfigModel;

    /**
     * global config values service
     *
     * @private
     * @type {Config}
     * @memberof WebpackService
     */
    private configService: Config;

    public constructor() {
        if (WebpackService.instance) {
            throw new Error("could not create instance of WebpackService, use WebpackService.getInstance() instead");
        }

        this.configService = Config.getInstance();
        this.configModel = new WebpackConfigModel();

        WebpackService.instance = this;
    }

    /**
     * get webpack configuration
     *
     * @returns {WebpackConfigModel}
     * @memberof WebpackService
     */
    public getConfiguration(): WebpackConfigModel {
        return this.configModel;
    }

    /**
     * create new webpack instance and returns compiler
     *
     * @returns {Promise<Webpack.Compiler>}
     * @memberof WebpackService
     */
    public async getWebpack(): Promise<Webpack.Compiler> {
        return Webpack(await this.loadConfigurationFile());
    }

    /**
     * add new plugin to webpack
     *
     * @param plugin
     */
    public addPlugin(plugin: Webpack.Plugin) {
        const plugins =  this.configModel.getPlugins();

        if ( !plugins || ! plugins.length ) {
            this.configModel.setPlugins([plugin]);
            return;
        }

        plugins.push(plugin);
    }

    /**
     * add multiple webpack plugins
     *
     * @param {Webpack.Plugin[]} plugins
     * @memberof WebpackService
     */
    public addPlugins(plugins: Webpack.Plugin[]) {
        plugins.forEach( (plugin) => {
            this.addPlugin(plugin);
        });
    }

    /**
     * set webpack option
     *
     * @param {string} option
     * @param {string} value
     * @memberof WebpackService
     */
    public setOption(option: string, value: string) {

        console.log(option, value);
        const setterMethod = `set${option.charAt(0).toUpperCase()}${option.slice(1)}`;
        const methodExists = Object.prototype.toString.call(
            this.configModel[setterMethod]).slice(8, -1) === "Function";

        if ( methodExists ) {

            console.log(setterMethod);
            switch (option) {
                case "outputDirectory":
                    value = `${this.configModel.getContextPath()}/${value}`;
                    break;
            }
            this.configModel[setterMethod](value);
        }
    }

    /**
     * load configuration file for webpack
     *
     * @private
     * @returns {Promise<Webpack.Configuration>}
     * @memberof WebpackService
     */
    private async loadConfigurationFile(): Promise<Webpack.Configuration> {
        const webpackConfig = await import("../templates/webpack.config");
        return webpackConfig.default;
    }
}
