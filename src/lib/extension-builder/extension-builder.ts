import { Plugin } from "webpack";
import { WebpackBuilder } from "../webpack-builder";
import { WebpackConfigModel } from "../webpack-builder/model/webpack-config.model";
import { WebpackService } from "../webpack-builder/service/webpack.service";
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
    protected configureWebpack(): WebpackConfigModel {
        const config = super.configureWebpack();
        config.setEntryFile(`./${config.getPackageName()}.ts`);
        config.setExternalModules([{
            angular   : "angular",
            qlik      : "qlik",
            qvangular : "qvangular",
        }]);
        return config;
    }

    /**
     * @inheritDoc
     * @protected
     * @returns {Plugin[]}
     * @memberof WebpackBuilder
     */
    protected loadWebpackPlugins(): Plugin[] {

        const config: WebpackConfigModel  = WebpackService.getInstance().getConfiguration();
        const plugins = super.loadWebpackPlugins();
        const packageName = config.getPackageName();

        return plugins.concat([
            new PathOverridePlugin(/\/umd\//, "/esm/"),
            new CopyWebpackPlugin([
                { from: `${packageName}.qext`, to: `${packageName}.qext` },
                { from: "wbfolder.wbl" , to: "wbfolder.wbl" },
            ]),
            new ZipWebpackPlugin({
                filename: `${packageName}.zip`,
                path: config.getOutDirectory(),
            }),
        ]);
    }
}
