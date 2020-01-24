import { existsSync, writeFileSync } from "fs";
import { resolve } from "path";
import { IBuilderProperty, ICommandLineBuilderData, ICommandLineResult } from "../api/cmdline-observer";
import { Namespaces } from "../api/namespaces";
import { CIProperties } from "../model/extension/ci-properties";
import { ExtensionModel } from "../model/extension/extension";
import { QextProperties } from "../model/extension/qext-properties";
import { QextPropertiesModel } from "../model/extension/qext-properties.model";
import { CI_CONFIG, CI_CONFIG_FILE_NAME } from "../model/tsconfig";
import { PackageJsonWriter } from "./package-json.writer";
import { Webpack } from "./webpack";

export class Extension extends Webpack {

    /**
     * qext data model
     *
     * @private
     * @type {QextPropertiesModel}
     * @memberof Extension
     */
    private qextModel: QextPropertiesModel;

    /**
     * instance from package.json writer
     *
     * @private
     * @type {PackageJsonWriter}
     * @memberof Extension
     */
    private writer: PackageJsonWriter;

    /**
     * Creates an instance of Extension.
     * @memberof Extension
     */
    public constructor() {
        super();

        this.qextModel = new QextPropertiesModel();
        this.model = new ExtensionModel();
        this.writer = PackageJsonWriter.getInstance();
    }

    /**
     * @inheritdoc
     * @returns {Promise<string[]>}
     * @memberof Extension
     */
    public async run(): Promise<string[]> {

        /** call parent */
        const parentResult: string[] = await super.run();

        this.writeQextData();
        this.writeCiConfigFile();
        this.createWbFolderFile();

        return [
            ...parentResult,
            "added qext properties to package.json",
            "created file: wbfolder.wbl",
        ];
    }

    /**
     * @inheritdoc
     * @param {ICommandLineResult} result
     * @memberof Extension
     */
    public readCommandlineArgument(result: ICommandLineResult) {
        switch (result.namespace) {
            case Namespaces.QEXT:
                this.writeProperty(this.qextModel, result.property as IBuilderProperty);
                break;
            case Namespaces.CI:
                this.writeProperty(this.model, result.property as IBuilderProperty);
                break;
            default:
                super.readCommandlineArgument(result);
        }
    }

    /**
     * @inheritdoc
     * @readonly
     * @protected
     * @type {ICommandLineBuilderData[]}
     * @memberof Extension
     */
    protected get commandLineData(): ICommandLineBuilderData[] {
        return [
            ...super.commandLineData,
            CIProperties,
            QextProperties,
        ];
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
            "q2g-build:dev": `node node_modules/q2g-build --builder extension --config ${configFileName}`,
            // tslint:disable-next-line:max-line-length
            "q2g-build:prod": `node node_modules/q2g-build --builder extension --env production --config ${configFileName}`,
        };
        this.writer.write("scripts", scripts);
    }

    /**
     * write property to existing model
     *
     * @private
     * @param {*} model
     * @param {ICommandLineProperty} property
     * @memberof Extension
     */
    private writeProperty(model, property: IBuilderProperty) {
        model[property.name] = property.value;
    }

    /**
     * write qext data to package.json
     *
     * @private
     * @memberof Extension
     */
    private writeQextData() {
        this.writer.write("qext", this.qextModel.raw);
    }

    private writeCiConfigFile() {
        const model = this.model as ExtensionModel;
        if (model.ci) {
            this.fileWriter.write(CI_CONFIG_FILE_NAME, `${JSON.stringify(CI_CONFIG, null, 4)}\n`);
        }
    }

    /**
     * create wbfolder file for extension
     *
     * @private
     * @memberof Extension
     */
    private createWbFolderFile() {
        const filePath = resolve(process.cwd(), "wbfolder.wbl");
        if (!existsSync(filePath)) {
            writeFileSync("wbfolder.wbl", "");
        }
    }
}
