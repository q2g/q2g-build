"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const qext_file_builder_1 = require("../../qext-file-builder/qext-file.builder");
const webpack_service_1 = require("../../webpack-builder/service/webpack.service");
class ExtensionService {
    constructor() {
        this.webpackService = webpack_service_1.WebpackService.getInstance();
        this.qextFileBuilder = new qext_file_builder_1.QextFileBuilder();
    }
    initializeQextData() {
        let data = this.readPackageJSON();
        const qext = data.qext || {};
        data = {
            author: data.author,
            description: data.description,
            homepage: data.homepage || "",
            keywords: data.keywords ? data.keywords.join(",") : "",
            license: data.license || "",
            name: data.name,
            repository: data.repository ? data.repository.url : "",
            version: data.version,
        };
        this.qextFileBuilder.configure(Object.assign({}, data, qext, { outDirectory: this.webpackService.getConfig().getOutDirectory() }));
    }
    createQextFile() {
        const target = path_1.resolve(this.webpackService.getConfig().getProjectRoot(), this.webpackService.getConfig().getOutDirectory());
        this.qextFileBuilder.run();
    }
    readPackageJSON() {
        const file = path_1.resolve(this.webpackService.getConfig().getProjectRoot(), "package.json");
        const pkgData = JSON.parse(fs_1.readFileSync(file).toString());
        return pkgData;
    }
}
exports.ExtensionService = ExtensionService;
