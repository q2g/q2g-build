import { IDataNode } from "../../../api/data-node";
import { IQextData } from "../api/qext-data.interface";

export class QextModel implements IQextData {

    private qextAuthor: string;

    private qextDependencies: IDataNode;

    private qextDescription: string;

    private qextIcon: string;

    private qextName: string;

    private qextType: string;

    private qextVersion: string;

    private qextPreview: string;

    private qextHomepage: string;

    private qextKeywords: string;

    private qextLicense: string;

    private qextRepository: string;

    public get author(): string {
        return this.qextAuthor;
    }

    public get dependencies(): IDataNode {
        return this.qextDependencies;
    }

    public get description(): string {
        return this.qextDescription;
    }

    public get icon(): string {
        return this.qextIcon;
    }

    public get name(): string {
        return this.qextName;
    }

    public get type(): string {
        return this.qextType;
    }

    public get version(): string {
        return this.qextVersion;
    }

    public get preview(): string {
        return this.qextPreview;
    }

    public get homepage(): string {
        return this.qextHomepage;
    }

    public get keywords(): string {
        return this.qextKeywords;
    }

    public get license(): string {
        return this.qextLicense;
    }

    public get repository(): string {
        return this.qextRepository;
    }

    public set author(val: string) {
        this.qextAuthor = val;
    }

    public set dependencies(dep: IDataNode) {
        this.qextDependencies = dep;
    }

    public set description(val: string) {
        this.qextDescription = val;
    }

    public set icon(val: string) {
        this.qextIcon = val;
    }

    public set name(val: string) {
        this.qextName = val;
    }

    public set type(val: string) {
        this.qextType = val;
    }

    public set version(val: string) {
        this.qextVersion = val;
    }

    public set preview(val: string) {
        this.qextPreview = val;
    }

    public set homepage(val: string) {
        this.qextHomepage = val;
    }

    public set keywords(val: string) {
        this.qextKeywords = val;
    }

    public set license(val: string) {
        this.qextLicense = val;
    }

    public set repository(val: string) {
        this.qextRepository = val;
    }
}
