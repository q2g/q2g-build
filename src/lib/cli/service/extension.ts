import { IBuilderProperty, ICommandLineBuilderData, ICommandLineResult } from "../api/cmdline-observer";
import { Namespaces, QextProperties } from "../model/extension/qext-properties";
import { QextPropertiesModel } from "../model/extension/qext-properties.model";
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

    public constructor() {
        super();

        this.qextModel = new QextPropertiesModel();
        this.writer = PackageJsonWriter.getInstance();
    }

    /**
     * @inheritdoc
     * @returns {Promise<void>}
     * @memberof Extension
     */
    public async run(): Promise<void> {
        /** call parent */
        await super.run();

        this.writer.write("qext", this.qextModel.raw);
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
        return [...super.commandLineData, QextProperties];
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
}
