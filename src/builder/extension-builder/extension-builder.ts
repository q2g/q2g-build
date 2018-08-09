import { existsSync } from "fs";
import { resolve } from "path";
import { Plugin } from "webpack";
import { IBuilderEnvironment } from "../../api";
import { IDataNode } from "../../api/data-node";
import { WebpackBuilder } from "../webpack-builder";
import { CopyWebpackPlugin, PathOverridePlugin, ZipWebpackPlugin } from "./plugins";

/**
 * Builder for Qlick 2 Go Extensions
 *
 * @export
 * @class ExtensionBuilder
 * @extends {WebpackBuilder}
 */
export class ExtensionBuilder extends WebpackBuilder {

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
     * @inheritDoc
     * @protected
     * @returns {Plugin[]}
     * @memberof WebpackBuilder
     */
    protected loadWebpackPlugins(): Plugin[] {

        const plugins = super.loadWebpackPlugins();

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
     * get binary files which should copied to dist folder
     *
     * @private
     * @returns {IDataNode[]}
     * @memberof ExtensionBuilder
     */
    private getBinaryFiles(): IDataNode[] {

        const packageName = this.webpackService.getConfig().getPackageName();
        const binFiles = [
            { from: `${packageName}.qext`, to: `${packageName}.qext` },
            { from: "wbfolder.wbl" , to: "wbfolder.wbl" },
        ];

        if ( existsSync( resolve(this.webpackService.getConfig().getProjectRoot(), "preview.png") )) {
            binFiles.push({from: "preview.png", to: "preview.png" });
        }

        return binFiles;
    }
}
