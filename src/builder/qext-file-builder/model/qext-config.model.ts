import { IDataNode } from "../../../api/data-node";

export class QextConfigModel {

    private author: string = "";

    private dependencies: IDataNode = {};

    private description: string = "";

    private id: string = "";

    private icon: string = "";

    private name: string = "";

    private type: string = "";

    private version: string = "";

    private preview: string = "";

    private homepage: string = "";

    private keywords: string = "";

    private license: string = "";

    private outDirectory: string = "";

    private repository: string = "";

    public getAuthor(): string {
        return this.author;
    }

    public getDependencies(): IDataNode {
        return this.dependencies;
    }

    public getDescription(): string {
        return this.description;
    }

    public getId(): string {
        return this.id;
    }

    public getIcon(): string {
        return this.icon;
    }

    public getName(): string {
        return this.name;
    }

    public getType(): string {
        return this.type;
    }

    public getVersion(): string {
        return this.version;
    }

    public getPreview(): string {
        return this.preview;
    }

    public getHomepage(): string {
        return this.homepage;
    }

    public getKeywords(): string {
        return this.keywords;
    }

    public getLicense(): string {
        return this.license;
    }

    public getOutDirectory(): string {
        return this.outDirectory;
    }

    public getRepository(): string {
        return this.repository;
    }

    public setAuthor(val: string) {
        this.author = val;
    }

    public setDependencies(dep: IDataNode) {
        this.dependencies = dep;
    }

    public setDescription(val: string) {
        this.description = val;
    }

    public setId(val: string) {
        this.id = val;
    }

    public setIcon(val: string) {
        this.icon = val;
    }

    public setName(val: string) {
        this.name = val;
    }

    public setType(val: string) {
        this.type = val;
    }

    public setVersion(val: string) {
        this.version = val;
    }

    public setPreview(val: string) {
        this.preview = val;
    }

    public setHomepage(val: string) {
        this.homepage = val;
    }

    public setKeywords(val: string) {
        this.keywords = val;
    }

    public setLicense(val: string) {
        this.license = val;
    }

    public setOutDirectory(val: string) {
        this.outDirectory = val;
    }

    public setRepository(val: string) {
        this.repository = val;
    }
}
