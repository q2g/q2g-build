import { resolve } from "path";
import { Config, IDataNode } from "rh-utils";
import { Compiler } from "webpack";
import { AppConfigProperties, IBuilder } from "../../api";
import { WebpackConfigProperties } from "./api/config";
import { WebpackConfigModel } from "./model";
import { WebpackService } from "./service/webpack.service";

/**
 * builder for webpack to bundle all files
 *
 * @export
 * @class WebpackBuilder
 * @implements {IBuilder}
 */
export class WebpackBuilder implements IBuilder {

    protected configService: Config;

    private webpackService: WebpackService;

    private sourceRoot: string;

    public constructor() {

        this.webpackService = WebpackService.getInstance();
        this.configService  = Config.getInstance();
        this.sourceRoot     = this.configService.get(AppConfigProperties.sourceRoot);

        this.createDefaultConfiguration();
    }

    /**
     * configure webpack this will cause override if propertie
     * is allready set
     *
     * @param {IDataNode} config
     * @memberof WebpackBuilder
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

    /**
     * run webpack compiler
     *
     * @memberof WebpackBuilder
     */
    public async run() {
        const compiler: Compiler = await this.webpackService.getWebpack();
        compiler.run((err) => {
            if ( err ) {
                process.stderr.write(err.toString());
            }
        });
    }

    /**
     * create default configuration, override this to add / change configuration
     * properties
     *
     * @protected
     * @memberof WebpackBuilder
     */
    protected createDefaultConfiguration(): WebpackConfigModel {

        const sourceRoot = this.sourceRoot;

        /** @var {string} q2gBuilderSource q2g-build path in source package node_modules folder */
        const q2gBuilderSource = `${sourceRoot}/node_modules/q2g-build/bin`;

        /** @var {string} q2gLoaderContext own loader paths */
        const q2gLoaderContext = resolve(q2gBuilderSource, "./lib/webpack-builder/loader");

        const config = this.webpackService.getConfiguration();
        config.setConfigFile("development.config");
        config.setConfigRoot(resolve(q2gBuilderSource, "./lib/webpack-builder/config"));
        config.setContextPath(sourceRoot);
        config.setEntryFile("./app/index.ts");
        config.setOutputDirectory(`${sourceRoot}/dist`);
        config.setOutFileName(`bundle.js`);
        config.setTsConfigFile(`${sourceRoot}/tsconfig.json`);
        config.setLoaderContextPaths([
            // vendor loader path ( aka ts-loader, css-loader )
            resolve(q2gBuilderSource, "../node_modules"),
            // q2g-build loader path
            q2gLoaderContext,
        ]);

        return config;
    }
}
