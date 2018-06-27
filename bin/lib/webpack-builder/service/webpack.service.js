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
const rh_utils_1 = require("rh-utils");
const Webpack = require("webpack");
const webpack_config_model_1 = require("../model/webpack-config.model");
class WebpackService {
    constructor() {
        if (WebpackService.instance) {
            throw new Error("could not create instance of WebpackService, use WebpackService.getInstance() instead");
        }
        this.configService = rh_utils_1.Config.getInstance();
        this.configModel = new webpack_config_model_1.WebpackConfigModel();
        WebpackService.instance = this;
    }
    static getInstance() {
        return this.instance;
    }
    getConfiguration() {
        return this.configModel;
    }
    getWebpack() {
        return __awaiter(this, void 0, void 0, function* () {
            return Webpack(yield this.loadConfigurationFile());
        });
    }
    addPlugin(plugin) {
        const plugins = this.configModel.getPlugins();
        if (!plugins || !plugins.length) {
            this.configModel.setPlugins([plugin]);
            return;
        }
        plugins.push(plugin);
    }
    addPlugins(plugins) {
        plugins.forEach((plugin) => {
            this.addPlugin(plugin);
        });
    }
    setOption(option, value) {
        const setterMethod = `set${option}`;
        if (this.configModel.hasOwnProperty(setterMethod)) {
            this.configModel[setterMethod](value);
        }
    }
    loadConfigurationFile() {
        return __awaiter(this, void 0, void 0, function* () {
            const webpackConfig = yield Promise.resolve().then(() => require("../model/webpack.config"));
            return webpackConfig.default;
        });
    }
}
WebpackService.instance = new WebpackService();
exports.WebpackService = WebpackService;
