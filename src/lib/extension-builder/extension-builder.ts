import { Plugin } from "webpack";
import { WebpackBuilder } from "../webpack-builder";
import { WebpackConfigModel } from "../webpack-builder/model/webpack-config.model";
import { WebpackService } from "../webpack-builder/service/webpack.service";
import { CopyWebpackPlugin, ZipWebpackPlugin } from "./plugins";

/**
 * Builder for Qlick 2 Go Extensions
 *
 * @export
 * @class ExtensionBuilder
 * @extends {WebpackBuilder}
 */
export class ExtensionBuilder extends WebpackBuilder {

    /**
     * load webpack plugins into webpack configuration model
     *
     * @protected
     * @returns {Plugin[]}
     * @memberof WebpackBuilder
     */
    protected loadWebpackPlugins(): Plugin[] {

        const config: WebpackConfigModel  = WebpackService.getInstance().getConfiguration();
        const plugins = super.loadWebpackPlugins();

        return plugins.concat([
            new CopyWebpackPlugin([
                { from: "extension.qext", to: "extension.qext" },
                { from: "wbfolder.wbl" , to: "wbfolder.wbl" },
            ]),
            new ZipWebpackPlugin({
                filename: "extension.zip",
                path: config.getOutputDirectory(),
            }),
        ]);
    }
}
