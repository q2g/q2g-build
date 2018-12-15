import { isBoolean } from "util";

export class WebpackModel {

    private webpackEntryFile: string;
    private webpackOutFileName: string;
    private webpackOutputDirectory: string;
    private webpackTsConfigFile: string;
    private webpackWatch: boolean;

    public set entryFile(file: string) {
        this.webpackEntryFile = file;
    }

    public set outFileName(name: string) {
        this.webpackOutFileName = name;
    }

    public set outputDirectory(directory: string) {
        this.webpackOutputDirectory = directory;
    }

    public set tsConfigFile(file: string) {
        this.webpackTsConfigFile = file;
    }

    public set watch(enabled: boolean | string) {
        this.webpackWatch = !isBoolean(enabled) ? enabled === "true" : enabled;
    }

    public get raw() {
        return {
            entryFile:       this.webpackEntryFile,
            outFileName:     this.webpackOutFileName,
            outputDirectory: this.webpackOutputDirectory,
            tsConfigFile:    this.webpackTsConfigFile,
            watch:           this.webpackWatch,
        };
    }
}
