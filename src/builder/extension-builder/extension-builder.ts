import { existsSync, readFileSync } from "fs";
import { resolve } from "path";
import { Plugin } from "webpack";
import { IBuilderEnvironment } from "../../api";
import { IDataNode } from "../../api/data-node";
import { WebpackBuilder } from "../webpack-builder";
import { WebpackConfigModel } from "../webpack-builder/model";
import { CopyWebpackPlugin, PathOverridePlugin, QextFilePlugin, ZipWebpackPlugin } from "./plugins";
import { DeployExtensionPlugin } from "./plugins/ci/ci.plugin";
import { ExtensionService } from "./service/extension.service";
import { QrsService } from "./service/qrs.service";

/**
 * Builder for Qlick 2 Go Extensions
 *
 * @export
 * @class ExtensionBuilder
 * @extends {WebpackBuilder}
 */
export class ExtensionBuilder extends WebpackBuilder {

    private extensionService: ExtensionService;

    private qrsService: QrsService;

    public constructor() {
        super();
        this.extensionService = ExtensionService.instance;
        this.qrsService       = QrsService.instance;
    }

    /**
     *
     * @inheritDoc
     * @param {IBuilderEnvironment} env
     * @memberof ExtensionBuilder
     */
    public initialize(env: IBuilderEnvironment) {

        super.initialize(env);

        this.webpackService.getConfig().setExternalModules([
            { angular  : "angular"},
            { qlik     : "qlik" },
            { qvangular: "qvangular"},
        ]);
    }

    protected getInitialConfig(env: IBuilderEnvironment): IDataNode {
        const initialConfig = super.getInitialConfig(env);
        initialConfig.entryFile = `./${env.projectName}.ts`;
        return initialConfig;
    }

    protected async beforeRun() {
        await super.beforeRun();
        this.qrsService.certificateRoot = resolve(this.webpackService.getConfig().getProjectRoot(), "./config/cert");
    }

    /**
     * webpack build process has completed without errors
     *
     * @override
     * @protected
     * @memberof ExtensionBuilder
     */
    protected async completed() {
        process.stdout.write("extension successfully created.");
    }

    /**
     * @inheritDoc
     * @protected
     * @returns {Plugin[]}
     * @memberof WebpackBuilder
     */
    protected loadWebpackPlugins(): Plugin[] {

        const plugins  = super.loadWebpackPlugins();
        const fileName = this.webpackService.getConfig().getOutFileName();
        const outDir   = this.webpackService.getConfig().getOutDirectory();

        return plugins.concat([
            new PathOverridePlugin(/\/umd\//, "/esm/"),
            new CopyWebpackPlugin(this.getBinaryFiles()),
            new QextFilePlugin(
                this.extensionService.getQextConfiguration()),
            new ZipWebpackPlugin({
                filename: `${fileName}.zip`,
                path: outDir,
            }),
            this.createDeployPlugin(fileName),
        ]);
    }

    /**
     * get binary files which should copy to dist folder
     *
     * @private
     * @returns {IDataNode[]}
     * @memberof ExtensionBuilder
     */
    private getBinaryFiles(): IDataNode[] {

        const binFiles = [
            { from: "wbfolder.wbl" , to: "wbfolder.wbl" },
        ];

        if (existsSync(resolve(this.webpackService.getConfig().getProjectRoot(), "preview.png"))) {
            binFiles.push({from: "preview.png", to: "preview.png" });
        }

        return binFiles;
    }

    private createDeployPlugin(name: string): DeployExtensionPlugin {

        const config: WebpackConfigModel = this.webpackService.getConfig();
        const configDirectory = resolve(config.getProjectSource(), "config");

        if (!existsSync(configDirectory)) {
            return null;
        }

        return new DeployExtensionPlugin(config.getOutFileName(), config.getOutDirectory());
    }
}
