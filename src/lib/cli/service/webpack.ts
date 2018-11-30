import {
    IBuilderProperty,
    ICommandLineBuilderData,
    ICommandLineReaderObserver,
    ICommandLineResult,
} from "../api/cmdline-observer";
import { Namespaces } from "../api/namespaces";
import { TS_CONFIG, TS_CONFIG_FILE_NAME } from "../model/tsconfig";
import WebpackProperties from "../model/webpack/webpack-properties";
import { WebpackModel } from "../model/webpack/webpack-properties.model";
import { CommandlineReader } from "./cmdline-reader";
import { FileWriter } from "./file-writer";
import { PackageJsonWriter } from "./package-json.writer";

export class Webpack implements ICommandLineReaderObserver {

    private reader: CommandlineReader;

    private model: WebpackModel;

    private fileWriter: FileWriter;

    private pkgJsonWriter: PackageJsonWriter;

    public constructor() {
        this.reader = new CommandlineReader();
        this.reader.subscribe(this);

        this.model         = new WebpackModel();
        this.fileWriter    = FileWriter.getInstance();
        this.pkgJsonWriter = PackageJsonWriter.getInstance();
    }

    /**
     * start the reader and build files we need
     *
     * @returns {Promise<void>}
     * @memberof Webpack
     */
    public async run(): Promise<string[]> {
        await this.reader.read(this.commandLineData);

        // set ts config file
        this.model.tsConfigFile = TS_CONFIG_FILE_NAME;

        this.writeTsConfigFile();
        this.writeJsonConfigFile();
        this.writeBuildScripts("q2g-build.webpack.json");

        return [
            "created file: q2g-build.webpack.json",
            "add build scripts to package.json",
        ];
    }

    /**
     *
     *
     * @param {ICommandLineArgument} data
     * @memberof Webpack
     */
    public readCommandlineArgument(result: ICommandLineResult) {

        if (result.namespace === Namespaces.WEBPACK) {
            const property = result.property as IBuilderProperty;
            this.model[property.name] = property.value;
        }
    }

    /**
     * get command line data with questions to fullfill data
     *
     * @readonly
     * @protected
     * @type {ICommandLineData[]}
     * @memberof Webpack
     */
    protected get commandLineData(): ICommandLineBuilderData[] {
        return [WebpackProperties];
    }

    /**
     * write build scripts into package.json
     *
     * @protected
     * @param {string} configFileName
     * @memberof Webpack
     */
    protected writeBuildScripts(configFileName: string) {
        const scripts = {
            "q2g-build:dev": `node node_modules/q2g-build --builder webpack --config ${configFileName}`,
            // tslint:disable-next-line:max-line-length
            "q2g-build:prod": `node node_modules/q2g-build --builder webpack --env production --config ${configFileName}`,
        };

        this.pkgJsonWriter.write("scripts", scripts);
    }

    /**
     * write json config file
     *
     * @private
     * @memberof Webpack
     */
    private writeJsonConfigFile() {
        this.fileWriter.write(
            "q2g-build.webpack.json",
            `${JSON.stringify(this.model.raw, null, 4)}\n`,
        );
    }

    private writeTsConfigFile() {
        this.fileWriter.write(TS_CONFIG_FILE_NAME, `${JSON.stringify(TS_CONFIG, null, 4)}\n`);
    }
}
