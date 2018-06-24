import { resolve } from "path";
import { Config } from "rh-utils";
import { Compiler } from "webpack";
import { AppConfigProperties, IDataNode } from "../../api";
import { Builder } from "../../lib/builder";
import { WebpackConfigProperties } from "./api/config";
import { WebpackService } from "./service/webpack.service";

export class WebpackBuilder extends Builder {
    private webpackService: WebpackService;

    private configService: Config;

    private sourceRoot: string;

    public constructor() {

        super();

        this.webpackService = WebpackService.getInstance();
        this.configService  = Config.getInstance();
        this.sourceRoot     = this.configService.get(AppConfigProperties.sourceRoot);
    }

    /**
     * write configuration for webpack in config service
     *
     * @param config
     */
    public configure(config: IDataNode): void {

        for (const property in WebpackConfigProperties) {
            if (config.hasOwnProperty(property) && config[property]) {
                let value = config[property];
                if ( property === "outDir" ) {
                    value = resolve(this.sourceRoot, config[property]);
                }
                this.configService.set(WebpackConfigProperties[property], value, true);
            }
        }
    }

    public run() {
        const compiler: Compiler = this.webpackService.getWebpack();
        compiler.run((err) => {
            if ( err ) {
                process.stderr.write(err.toString());
            }
        });
    }
}
