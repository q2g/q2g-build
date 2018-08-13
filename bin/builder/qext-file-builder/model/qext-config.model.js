"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QextConfigModel {
    constructor() {
        this.author = "";
        this.dependencies = {};
        this.description = "";
        this.icon = "";
        this.name = "";
        this.type = "";
        this.version = "";
        this.preview = "";
        this.homepage = "";
        this.keywords = "";
        this.license = "";
        this.outDirectory = "";
        this.repository = "";
    }
    getAuthor() {
        return this.author;
    }
    getDependencies() {
        return this.dependencies;
    }
    getDescription() {
        return this.description;
    }
    getIcon() {
        return this.icon;
    }
    getName() {
        return this.name;
    }
    getType() {
        return this.type;
    }
    getVersion() {
        return this.version;
    }
    getPreview() {
        return this.preview;
    }
    getHomepage() {
        return this.homepage;
    }
    getKeywords() {
        return this.keywords;
    }
    getLicense() {
        return this.license;
    }
    getOutDirectory() {
        return this.outDirectory;
    }
    getRepository() {
        return this.repository;
    }
    setAuthor(val) {
        this.author = val;
    }
    setDependencies(dep) {
        this.dependencies = dep;
    }
    setDescription(val) {
        this.description = val;
    }
    setIcon(val) {
        this.icon = val;
    }
    setName(val) {
        this.name = val;
    }
    setType(val) {
        this.type = val;
    }
    setVersion(val) {
        this.version = val;
    }
    setPreview(val) {
        this.preview = val;
    }
    setHomepage(val) {
        this.homepage = val;
    }
    setKeywords(val) {
        this.keywords = val;
    }
    setLicense(val) {
        this.license = val;
    }
    setOutDirectory(val) {
        this.outDirectory = val;
    }
    setRepository(val) {
        this.repository = val;
    }
}
exports.QextConfigModel = QextConfigModel;
