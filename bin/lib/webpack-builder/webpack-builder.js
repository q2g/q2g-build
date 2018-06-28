"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const rh_utils_1 = require("rh-utils");
const model_1 = require("../../model");
const services_1 = require("../../services");
const model_2 = require("./model");
const plugins_1 = require("./plugins");
const webpack_service_1 = require("./service/webpack.service");
class WebpackBuilder {
    constructor() {
        this.webpackService = webpack_service_1.WebpackService.getInstance();
        this.configService = rh_utils_1.Config.getInstance();
        this.sourceRoot = this.configService.get(model_1.AppConfigProperties.sourceRoot);
        this.configureWebpack();
    }
    configure(config) {
        const options = services_1.OptionHelper.cleanOptions(config, model_2.WebpackOption);
        const errors = services_1.OptionHelper.validateOptions(config, model_2.WebpackOption);
        if (!errors.length) {
            for (const name in options) {
                if (options.hasOwnProperty(name)) {
                    this.webpackService.setOption(name, options[name]);
                }
            }
        }
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            this.webpackService.addPlugins(this.loadWebpackPlugins());
            const compiler = yield this.webpackService.getWebpack();
            compiler.run((err) => {
                if (err) {
                    process.stderr.write(err.toString());
                }
            });
        });
    }
    configureWebpack() {
        const sourceRoot = this.sourceRoot;
        const q2gBuilderSource = `${sourceRoot}/node_modules/q2g-build/bin`;
        const q2gLoaderContext = path_1.resolve(q2gBuilderSource, "./lib/webpack-builder/loader");
        const packageName = this.configService.get(model_1.AppConfigProperties.packageName);
        const config = this.webpackService.getConfiguration();
        config.setPackageName(packageName);
        config.setContextPath(sourceRoot);
        config.setEntryFile("./index.ts");
        config.setOutputDirectory(`${sourceRoot}/dist`);
        config.setOutFileName(`${packageName}.js`);
        config.setTsConfigFile(`${sourceRoot}/tsconfig.json`);
        config.setLoaderContextPaths([
            path_1.resolve(q2gBuilderSource, "../node_modules"),
            q2gLoaderContext,
        ]);
        return config;
    }
    loadWebpackPlugins() {
        const config = this.webpackService.getConfiguration();
        const plugins = [
            new plugins_1.LogPlugin(),
            new plugins_1.CleanWebpackPlugin(config.getOutputDirectory(), { allowExternal: true }),
        ];
        return plugins;
    }
}
exports.WebpackBuilder = WebpackBuilder;
