"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WebpackConfigModel {
    getContextPath() {
        return this.contextPath;
    }
    getEntryFile() {
        return this.entryFile;
    }
    getExternalModules() {
        return this.externalModules;
    }
    getLoaderContextPaths() {
        return this.loaderContextPaths;
    }
    getOutputDirectory() {
        return this.outputDirectory;
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
    getTsConfigFile() {
        return this.tsConfigFile;
    }
    setOutputDirectory(dir) {
        this.outputDirectory = dir;
    }
    setEntryFile(filename) {
        this.entryFile = filename;
    }
    setExternalModules(modules) {
        this.externalModules = modules;
    }
    setPackageName(packageName) {
        this.packageName = packageName;
    }
    setTsConfigFile(filepath) {
        this.tsConfigFile = filepath;
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
