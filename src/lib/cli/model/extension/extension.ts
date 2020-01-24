import { WebpackModel } from "../webpack/webpack-properties.model";

export class ExtensionModel extends WebpackModel {

    private extensionCi: boolean;

    public set ci(enabled: boolean) {
        this.extensionCi = !!enabled;
    }

    public get ci(): boolean {
        return this.extensionCi;
    }

    /**
     * get raw data of model
     *
     * @readonly
     * @type {*}
     * @memberof ExtensionModel
     */
    public get raw(): any {
        const webpackProperties = super.raw;

        return {
            ...webpackProperties,
            ci: this.ci,
        };
    }
}
