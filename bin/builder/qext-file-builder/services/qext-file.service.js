"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const qext_config_service_1 = require("./qext-config.service");
class QextFileService {
    constructor() {
        this.configService = qext_config_service_1.QextConfigService.getInstance();
    }
    createFile() {
        const data = this.configService.toJson();
        const outDirectory = this.configService.getConfig().getOutDirectory();
        const filePath = path_1.resolve(outDirectory, `${this.configService.getConfig().getName()}.qext`);
        if (!fs_1.existsSync(outDirectory)) {
            this.createDirectory(outDirectory);
        }
        fs_1.writeFileSync(filePath, JSON.stringify(data, null, 4), { encoding: "utf8" });
    }
    createDirectory(path) {
        const paths = path.split(path_1.sep);
        let fullPath = "";
        paths.forEach((partial) => {
            if (fullPath === "") {
                fullPath = partial;
            }
            else {
                fullPath = [fullPath, partial].join(path_1.sep);
            }
            if (!fs_1.existsSync(fullPath)) {
                fs_1.mkdirSync(fullPath);
            }
        });
    }
}
exports.QextFileService = QextFileService;
