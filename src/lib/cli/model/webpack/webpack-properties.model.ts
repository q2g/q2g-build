export class WebpackModel {

    private webpackEntryFile: string;
    private webpackOutFileName: string;
    private webpackOutputDirectory: string;
    private webpackTsConfigFile: string;

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

    public get raw() {
        return {
            entryFile: this.webpackEntryFile,
            outFileName: this.webpackOutFileName,
            outputDirectory: this.webpackOutputDirectory,
            tsConfigFile: this.webpackTsConfigFile,
        };
    }
}
