"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("../../../data");
const config_service_1 = require("../../../services/config.service");
const tsc_option_rules_1 = require("../data/tsc.option.rules");
const typescript_config_model_1 = require("../model/typescript.config.model");
class TscConfigService extends config_service_1.ConfigService {
    constructor() {
        if (TscConfigService.instance) {
            throw new Error("could not create instance of TscConfigService. Use TscConfigService.getInstance instead");
        }
        super();
        TscConfigService.instance = this;
        return this;
    }
    getConfigRules() {
        return Object.assign({}, data_1.BuilderConfigRules, tsc_option_rules_1.TscConfigRules);
    }
    getConfigModel() {
        return new typescript_config_model_1.TscConfigModel();
    }
}
exports.TscConfigService = TscConfigService;
