"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_service_1 = require("../../../services/config.service");
const qext_config_ruleset_1 = require("../data/qext-config.ruleset");
const qext_file_properties_1 = require("../data/qext-file.properties");
const qext_config_model_1 = require("../model/qext-config.model");
class QextConfigService extends config_service_1.ConfigService {
    constructor() {
        if (QextConfigService.instance) {
            throw new Error(`could not create instance of QextConfigService.
             Use QextConfigService.getInstance instead.`);
        }
        super();
        QextConfigService.instance = this;
    }
    static getInstance() {
        return this.instance;
    }
    toJson() {
        const data = {};
        const configOptions = this.getConfigRules();
        Object.keys(qext_file_properties_1.QextFileProperties).forEach((option) => {
            const setting = qext_file_properties_1.QextFileProperties[option];
            const rule = configOptions[setting];
            const getterMethod = `get${setting.charAt(0).toUpperCase()}${setting.slice(1)}`;
            const methodExists = Object.prototype.toString.call(this.configModel[getterMethod]).slice(8, -1) === "Function";
            const value = methodExists ? this.configModel[getterMethod]() : "";
            if (rule.required || value !== undefined && value !== "") {
                data[setting] = value;
            }
        });
        return data;
    }
    getConfigModel() {
        return new qext_config_model_1.QextConfigModel();
    }
    getConfigRules() {
        return qext_config_ruleset_1.QextConfigRuleset;
    }
}
QextConfigService.instance = new QextConfigService();
exports.QextConfigService = QextConfigService;
