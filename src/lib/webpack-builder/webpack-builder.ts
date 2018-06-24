import { WebpackService } from "./service/webpack.service";
import { Compiler } from "webpack";
import { Builder } from "../builder";
import { Config } from "rh-utils";
import { ConfigurationPropertys } from "./api/config"
import { NAMESPACE_BASE_CONFIGURATION } from "../../api";
import { resolve } from "path";

export class WebpackBuilder extends Builder {
    private webpackService: WebpackService;

    private configService: Config;

    private sourceRoot: string;

    public constructor() {
        super();
        this.webpackService = WebpackService.getInstance();
        this.configService = Config.getInstance();

        this.sourceRoot = this.configService.get(NAMESPACE_BASE_CONFIGURATION.SOURCE_ROOT);

        this.configService.set(
            ConfigurationPropertys.outDir,
            resolve(`${this.sourceRoot}/dist`)
        );
    }

    /**
     * write configuration for webpack in config service
     * 
     * @param config 
     */
    public configure(config): void {

        for (const property in ConfigurationPropertys) {

            if (config.hasOwnProperty(property) && config[property]) {
                let value = config[property];

                if ( property == "outDir" ) {
                    value = resolve(this.sourceRoot, config[property]);
                }
                console.log(value);
                this.configService.set(ConfigurationPropertys[property], value, true);
            }
        }
        console.log(this.configService.get('q2gBuilder'));
    }

    public run() {
        const compiler: Compiler = this.webpackService.getWebpack();
        compiler.run((err) => {
            console.log(err);
        });
    }
}