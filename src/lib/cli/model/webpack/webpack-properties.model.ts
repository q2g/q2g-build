export class WebpackModel {

    private webpackEntryFile: string;
    private webpackOutFileName: string;
    private webpackOutputDirectory: string;

    public set entryFile(file: string) {
        this.webpackEntryFile = file;
    }

    public set outFileName(name: string) {
        this.webpackOutFileName = name;
    }

    public set outputDirectory(directory: string) {
        this.webpackOutputDirectory = directory;
    }

    public get raw() {
        return {
            entryFile: this.webpackEntryFile,
            outFileName: this.webpackOutFileName,
            outputDirectory: this.webpackOutputDirectory,
        };
    }
}
