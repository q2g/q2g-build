"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConfigModel {
    getOutDirectory() {
        return this.outDirectory;
    }
    getProjectRoot() {
        return this.projectRoot;
    }
    getProjectSource() {
        return this.projectSource;
    }
    getTsConfigFile() {
        return this.tsConfigFile;
    }
    setOutDirectory(path) {
        this.outDirectory = path;
    }
    setProjectRoot(path) {
        this.projectRoot = path;
    }
    setProjectSource(path) {
        this.projectSource = path;
    }
    setTsConfigFile(fileName) {
        this.tsConfigFile = fileName;
    }
}
exports.ConfigModel = ConfigModel;
