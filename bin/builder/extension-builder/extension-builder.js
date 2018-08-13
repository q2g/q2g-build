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
const fs_1 = require("fs");
const path_1 = require("path");
const webpack_builder_1 = require("../webpack-builder");
const plugins_1 = require("./plugins");
const extension_service_1 = require("./service/extension.service");
class ExtensionBuilder extends webpack_builder_1.WebpackBuilder {
    constructor() {
        super();
        this.extensionService = new extension_service_1.ExtensionService();
    }
    initialize(env) {
        super.initialize(env);
        this.webpackService.getConfig().setExternalModules([
            { angular: "angular" },
            { qlik: "qlik" },
            { qvangular: "qvangular" },
        ]);
    }
    getInitialConfig(env) {
        const initialConfig = super.getInitialConfig(env);
        initialConfig.entryFile = `./${env.projectName}.ts`;
        return initialConfig;
    }
    beforeRun() {
        try {
            this.extensionService.initializeQextData();
        }
        catch (e) {
            process.stderr.write(e.message);
            process.exit(1);
        }
        super.beforeRun();
    }
    completed() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.extensionService.createQextFile();
            process.stdout.write("extension successfully created.");
        });
    }
    loadWebpackPlugins() {
        const plugins = super.loadWebpackPlugins();
        const packageName = this.webpackService.getConfig().getPackageName();
        const outDir = this.webpackService.getConfig().getOutDirectory();
        return plugins.concat([
            new plugins_1.PathOverridePlugin(/\/umd\//, "/esm/"),
            new plugins_1.CopyWebpackPlugin(this.getBinaryFiles()),
            new plugins_1.ZipWebpackPlugin({
                filename: `${packageName}.zip`,
                path: outDir,
            }),
        ]);
    }
    getBinaryFiles() {
        const packageName = this.webpackService.getConfig().getPackageName();
        const binFiles = [
            { from: "wbfolder.wbl", to: "wbfolder.wbl" },
        ];
        if (fs_1.existsSync(path_1.resolve(this.webpackService.getConfig().getProjectRoot(), "preview.png"))) {
            binFiles.push({ from: "preview.png", to: "preview.png" });
        }
        return binFiles;
    }
}
exports.ExtensionBuilder = ExtensionBuilder;
