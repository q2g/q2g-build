import { resolve } from "path";
import { Config } from "rh-utils";
import * as Webpack from "webpack";
import { WebpackConfigModel } from "../model";

export class WebpackService {

    public static instance: WebpackService = new WebpackService();

    public static getInstance() {
        return this.instance;
    }

    private configModel: WebpackConfigModel;

    private configService: Config;

    public constructor() {
        if (WebpackService.instance) {
            throw new Error("could not create instance of WebpackService, use WebpackService.getInstance() instead");
        }

        this.configService = Config.getInstance();
        this.configModel = new WebpackConfigModel();

        WebpackService.instance = this;
    }

    public getConfiguration(): WebpackConfigModel {
        return this.configModel;
    }

    public async getWebpack(): Promise<Webpack.Compiler> {
        return Webpack(await this.loadConfigurationFile());
    }

    private async loadConfigurationFile(): Promise<Webpack.Configuration> {

        const configFilePath: string = resolve(
            this.configModel.getConfigRoot(), this.configModel.getConfigFile());

        const webpackConfig = await import(configFilePath);
        return webpackConfig.default;
    }
}
