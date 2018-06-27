"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_builder_1 = require("../webpack-builder");
const webpack_service_1 = require("../webpack-builder/service/webpack.service");
const plugins_1 = require("./plugins");
class ExtensionBuilder extends webpack_builder_1.WebpackBuilder {
    configureWebpack() {
        const config = super.configureWebpack();
        config.setEntryFile(`./${config.getPackageName()}.ts`);
        config.setExternalModules([{
                angular: "angular",
                qlik: "qlik",
                qvangular: "qvangular",
            }]);
        return config;
    }
    loadWebpackPlugins() {
        const config = webpack_service_1.WebpackService.getInstance().getConfiguration();
        const plugins = super.loadWebpackPlugins();
        const packageName = config.getPackageName();
        return plugins.concat([
            new plugins_1.PathOverridePlugin(/\/umd\//, "esm"),
            new plugins_1.CopyWebpackPlugin([
                { from: `${packageName}.qext`, to: `${packageName}.qext` },
                { from: "wbfolder.wbl", to: "wbfolder.wbl" },
            ]),
            new plugins_1.ZipWebpackPlugin({
                filename: `${packageName}.zip`,
                path: config.getOutputDirectory(),
            }),
        ]);
    }
}
exports.ExtensionBuilder = ExtensionBuilder;
