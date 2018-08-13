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
const Webpack = require("webpack");
const data_1 = require("../../../data");
const config_service_1 = require("../../../services/config.service");
const webpack_option_rules_1 = require("../data/webpack.option.rules");
const webpack_config_model_1 = require("../model/webpack-config.model");
class WebpackService extends config_service_1.ConfigService {
    constructor() {
        if (WebpackService.instance) {
            throw new Error("could not create instance of WebpackService, use WebpackService.getInstance() instead");
        }
        super();
        WebpackService.instance = this;
    }
    static getInstance() {
        return this.instance;
    }
    addPlugins(plugins) {
        this.getConfig().setPlugins(plugins);
    }
    getWebpack() {
        return __awaiter(this, void 0, void 0, function* () {
            return Webpack(yield this.loadConfigurationFile());
        });
    }
    getConfigRules() {
        return Object.assign({}, data_1.BuilderConfigRules, webpack_option_rules_1.WebpackOptionRules);
    }
    getConfigModel() {
        return new webpack_config_model_1.WebpackConfigModel();
    }
    loadConfigurationFile() {
        return __awaiter(this, void 0, void 0, function* () {
            const webpackConfig = yield Promise.resolve().then(() => require("../templates/webpack.config"));
            return webpackConfig.default;
        });
    }
}
WebpackService.instance = new WebpackService();
exports.WebpackService = WebpackService;
