"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const qext_config_exception_1 = require("./data/exception/qext-config.exception");
const qext_config_service_1 = require("./services/qext-config.service");
const qext_file_service_1 = require("./services/qext-file.service");
class QextFileBuilder {
    constructor() {
        this.configService = qext_config_service_1.QextConfigService.getInstance();
        this.fileService = new qext_file_service_1.QextFileService();
    }
    initialize(baseConfig) {
        this.initConfig = {
            projectRoot: baseConfig.projectRoot,
        };
    }
    configure(config) {
        const configuration = Object.assign({}, this.initConfig, config);
        const results = this.configService.setOptions(configuration);
        const errors = {};
        let hasError = false;
        results.forEach((result) => {
            if (result.errors.length) {
                hasError = true;
                errors[result.name] = result.errors;
            }
        });
        if (hasError) {
            throw new qext_config_exception_1.QextConfigurationException(JSON.stringify(errors));
        }
    }
    run() {
        return new Promise((resolve, reject) => {
            try {
                this.fileService.createFile();
                resolve();
            }
            catch (error) {
                reject(error.message);
            }
        });
    }
}
exports.QextFileBuilder = QextFileBuilder;
