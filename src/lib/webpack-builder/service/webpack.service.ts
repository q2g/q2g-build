import { Config, Log } from "rh-utils";
import * as Webpack from "webpack";
import { AppConfigProperties } from "../../../api";

export class WebpackService {
    public static instance: WebpackService = new WebpackService();

    public static getInstance() {
        return this.instance;
    }

    private DEVELOPMENT_CONFIGURATION = "../config/webpack/development.config";

    private PRODUCTION_CONFIGURATION = "../config/webpack/production.config";

    private logService: Log;

    private configService: Config;

    public constructor() {
        if (WebpackService.instance) {
            throw new Error("could not create instance of WebpackService, use WebpackService.getInstance() instead");
        }

        this.logService = Log.getInstance();
        this.configService = Config.getInstance();

        WebpackService.instance = this;
    }

    public getWebpack(): Webpack.Compiler {
        let configruation: Webpack.Configuration;

        const environment: string = this.configService.get(AppConfigProperties.environment);

        switch (environment) {
            case "development":
                configruation = this.loadDevelopmentConfiguration();
                break;
            case "production":
                configruation = this.loadProductionConfiguration();
                break;
            default:
                throw new Error(`${__filename}: invalid evironment is set:
                    ${environment}.`);
        }

        this.logService.log(
            `Used Webpack Configuration:\n${JSON.stringify(configruation, null, 4)}`,
            Log.LOG_DEBUG);

        return Webpack(configruation);
    }

    public loadProductionConfiguration(): Webpack.Configuration {
        return this.loadConfigurationFile(this.PRODUCTION_CONFIGURATION);
    }

    /**
     * load webpack configuration for development mode
     */
    private loadDevelopmentConfiguration(): Webpack.Configuration {
        return this.loadConfigurationFile(this.DEVELOPMENT_CONFIGURATION);
    }

    private loadConfigurationFile(file: string): Webpack.Configuration {
        /** @todo fix this since it is not allways default ... */
        const configuration = require(file);
        return configuration.default;
    }
}
