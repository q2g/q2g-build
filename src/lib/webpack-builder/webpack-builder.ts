import { resolve } from "path";
import { Config } from "rh-utils";
import { Compiler } from "webpack";
import { AppConfigProperties, IBuilder, IDataNode } from "../../api";
import { WebpackConfigProperties } from "./api/config";
import { WebpackService } from "./service/webpack.service";

export class WebpackBuilder implements IBuilder {
    private webpackService: WebpackService;

    private configService: Config;

    private sourceRoot: string;

    public constructor() {
        this.webpackService = WebpackService.getInstance();
        this.configService  = Config.getInstance();
        this.sourceRoot     = this.configService.get(AppConfigProperties.sourceRoot);

        this.createDefaultConfiguration();
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

    /**
     * create default configuration for webpack builder
     *
     * @protected
     */
    protected createDefaultConfiguration(): void {
        const sourceRoot = this.sourceRoot;

        /** @var {string} q2gBuilderSource q2g-build path in source package node_modules folder */
        const q2gBuilderSource = `${sourceRoot}/node_modules/q2g-build/bin`;

        /** @var {string} q2gLoaderContext own loader paths */
        const q2gLoaderContext = resolve(q2gBuilderSource, "./lib/webpack-builder/loader");

        this.configService.set( WebpackConfigProperties.outDir, `${sourceRoot}/dist`, false);
        this.configService.set( WebpackConfigProperties.entry, "./index.ts");
        this.configService.set( WebpackConfigProperties.tsconfig, `${sourceRoot}/tsconfig.json`);
        this.configService.set( WebpackConfigProperties.context, sourceRoot);

        /** set loader context paths where to search loaders */
        this.configService.set( WebpackConfigProperties.loaderContext, [
            resolve(q2gBuilderSource, "../node_modules"), // where to find vendor loaders (less, css or ts-loader)
            q2gLoaderContext, // where to find own q2g-builder/webpack-loaders
        ]);
    }
}
