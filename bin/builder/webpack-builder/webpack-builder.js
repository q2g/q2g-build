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
const plugins_1 = require("./plugins");
const webpack_service_1 = require("./service/webpack.service");
class WebpackBuilder {
    constructor() {
        this.webpackService = webpack_service_1.WebpackService.getInstance();
    }
    configure(config) {
        this.webpackService.setOptions(Object.assign({}, this.initialConfig, config));
    }
    initialize(environment) {
        const env = environment.environment;
        const settings = this.webpackService.getConfig();
        this.initialConfig = this.getInitialConfig(environment);
        settings.setLoaderContextPaths([
            path_1.resolve(environment.builderRoot, "./builder/webpack-builder/loader"),
            path_1.resolve(environment.builderRoot, "../node_modules"),
            path_1.resolve(environment.projectRoot, "./node_modules"),
        ]);
        settings.setPackageName(environment.projectName);
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            this.beforeRun();
            return new Promise((success, error) => __awaiter(this, void 0, void 0, function* () {
                const compiler = yield this.webpackService.getWebpack();
                compiler.run((err) => {
                    if (err) {
                        process.stderr.write(err.toString());
                        error(err);
                    }
                    this.completed();
                    success("completed");
                });
            }));
        });
    }
    beforeRun() {
        const env = this.webpackService.getConfig().getEnvrionment();
        const envConfig = {
            optimization: {
                minimize: env === "production" ? true : false,
            },
            webpackEnvrionment: env === "debug" ? "none" : env,
        };
        this.webpackService.addPlugins(this.loadWebpackPlugins());
        this.webpackService.setOptions(envConfig, true);
    }
    completed() { }
    getInitialConfig(environment) {
        const initialConfig = environment;
        initialConfig.entryFile = "./index.ts";
        initialConfig.outFileName = `${environment.projectName}.js`;
        return initialConfig;
    }
    loadWebpackPlugins() {
        const outDir = this.webpackService.getConfig().getOutDirectory();
        const plugins = [
            new plugins_1.LogPlugin(),
            new plugins_1.CleanWebpackPlugin(outDir, { allowExternal: true }),
        ];
        return plugins;
    }
}
exports.WebpackBuilder = WebpackBuilder;
