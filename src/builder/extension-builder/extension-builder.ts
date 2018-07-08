import { Plugin } from "webpack";
import { IBuilderEnvironment } from "../../api";
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
            new CopyWebpackPlugin([
                { from: `${packageName}.qext`, to: `${packageName}.qext` },
                { from: "wbfolder.wbl" , to: "wbfolder.wbl" },
            ]),
            new ZipWebpackPlugin({
                filename: `${packageName}.zip`,
                path: outDir,
            }),
        ]);
    }
}
