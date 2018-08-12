import * as Webpack from "webpack";
import { IOptionRuleSet } from "../../../api";
import { BuilderConfigRules } from "../../../data";
import { ConfigService } from "../../../services/config.service";
import { WebpackOptionRules } from "../data/webpack.option.rules";
import { WebpackConfigModel } from "../model/webpack-config.model";

export class WebpackService extends ConfigService<WebpackConfigModel> {

    public static instance: WebpackService = new WebpackService();

    public static getInstance() {
        return this.instance;
    }

    /**
     * global config values service
     *
     * @private
     * @type {Config}
     * @memberof WebpackService
     */
    private configService: WebpackService;

    public constructor() {
        if (WebpackService.instance) {
            throw new Error("could not create instance of WebpackService, use WebpackService.getInstance() instead");
        }
        super();
        WebpackService.instance = this;
    }

    public addPlugins(plugins) {
        this.getConfig().setPlugins(plugins);
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
     * get webpack configuration ruleset
     *
     * @protected
     * @returns {IOptionRuleSet}
     * @memberof WebpackService
     */
    protected getConfigRules(): IOptionRuleSet {

        return {
            ...BuilderConfigRules,
            ...WebpackOptionRules,
        };
    }

    /**
     * get model where to write configuration data
     *
     * @protected
     * @returns {WebpackConfigModel}
     * @memberof WebpackService
     */
    protected getConfigModel(): WebpackConfigModel {
        return new WebpackConfigModel();
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
