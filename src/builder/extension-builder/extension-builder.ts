import { existsSync } from "fs";
import { resolve } from "path";
import { Plugin } from "webpack";
import { IBuilderEnvironment } from "../../api";
import { IDataNode } from "../../api/data-node";
import { WebpackBuilder } from "../webpack-builder";
import { CopyWebpackPlugin, PathOverridePlugin, ZipWebpackPlugin } from "./plugins";
import { ExtensionService } from "./service/extension.service";

/**
 * Builder for Qlick 2 Go Extensions
 *
 * @export
 * @class ExtensionBuilder
 * @extends {WebpackBuilder}
 */
export class ExtensionBuilder extends WebpackBuilder {

    private extensionService: ExtensionService;

    public constructor() {
        super();
        this.extensionService = new ExtensionService();
    }

    /**
     * @inheritDoc
     * @protected
     * @returns {WebpackConfigModel}
     * @memberof ExtensionBuilder
     */
    public initialize(env: IBuilderEnvironment) {

        super.initialize(env);

        this.webpackService.setOptions({
            entryFile: `./${env.projectName}.ts`,
            externalModules: [
                { angular  : "angular"},
                { qlik     : "qlik" },
                { qvangular: "qvangular" },
            ],
        }, false);
    }

    /**
     * called before the build process start
     *
     * @protected
     * @memberof ExtensionBuilder
     */
    protected beforeRun() {

        try {
            /**
             * load extension data before we run this process
             * if this fails we could abort the process since there is
             * no valid qext file at the end
             */
            this.extensionService.initializeQextData();
        } catch ( e ) {
            process.stderr.write(e.message);
            process.exit(1);
        }

        super.beforeRun();
    }

    /**
     * webpack build process has completed without errors
     *
     * @override
     * @protected
     * @memberof ExtensionBuilder
     */
    protected completed() {
        this.extensionService.createQextFile();
    }

    /**
     * @inheritDoc
     * @protected
     * @returns {Plugin[]}
     * @memberof WebpackBuilder
     */
    protected loadWebpackPlugins(): Plugin[] {

        const plugins     = super.loadWebpackPlugins();
        const packageName = this.webpackService.getConfig().getPackageName();
        const outDir      = this.webpackService.getConfig().getOutDirectory();

        return plugins.concat([
            new PathOverridePlugin(/\/umd\//, "/esm/"),
            new CopyWebpackPlugin(this.getBinaryFiles()),
            new ZipWebpackPlugin({
                filename: `${packageName}.zip`,
                path: outDir,
            }),
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

        const packageName = this.webpackService.getConfig().getPackageName();
        const binFiles = [
            // { from: `${packageName}.qext`, to: `${packageName}.qext` },
            { from: "wbfolder.wbl" , to: "wbfolder.wbl" },
        ];

        if ( existsSync( resolve(this.webpackService.getConfig().getProjectRoot(), "preview.png") )) {
            binFiles.push({from: "preview.png", to: "preview.png" });
        }

        return binFiles;
    }
}
