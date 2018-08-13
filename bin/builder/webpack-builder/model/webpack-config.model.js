"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_config_model_1 = require("../../../model/app-config.model");
class WebpackConfigModel extends app_config_model_1.BuilderConfigModel {
    getContextPath() {
        return this.contextPath;
    }
    getEntryFile() {
        return this.entryFile;
    }
    getExternalModules() {
        return this.externalModules;
    }
    getWebpackEnvironment() {
        return this.webpackEnvrionment;
    }
    getLoaderContextPaths() {
        return this.loaderContextPaths;
    }
    getOptimization() {
        return this.optimization;
    }
    getOutFileName() {
        return this.outFileName;
    }
    getPackageName() {
        return this.packageName;
    }
    getPlugins() {
        return this.plugins;
    }
    setOptimization(optimization) {
        this.optimization = optimization;
    }
    setEntryFile(filename) {
        this.entryFile = filename;
    }
    setWebpackEnvironment(env) {
        this.webpackEnvrionment = env;
    }
    setExternalModules(modules) {
        this.externalModules = modules;
    }
    setPackageName(packageName) {
        this.packageName = packageName;
    }
    setContextPath(contextPath) {
        this.contextPath = contextPath;
    }
    setLoaderContextPaths(paths) {
        this.loaderContextPaths = paths;
    }
    setOutFileName(filename) {
        this.outFileName = filename;
    }
    setPlugins(plugins) {
        this.plugins = plugins;
    }
}
exports.WebpackConfigModel = WebpackConfigModel;
