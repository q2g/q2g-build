export class ConfigModel {

    private projectSource: string;

    private tsConfigFile: string;

    private nodePackageTS: string;

    public getProjectSource(): string {
        return this.projectSource;
    }

    public getTsConfigFile(): string {
        return this.tsConfigFile;
    }

    public getNodePackageTS(): string {
        return this.nodePackageTS;
    }

    public setProjectSource(path: string) {
        this.projectSource = path;
    }

    public setTsConfigFile(fileName: string) {
        this.tsConfigFile = fileName;
    }

    public setNodePackageTS(path: string) {
        this.nodePackageTS = path;
    }
}
