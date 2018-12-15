export class QextPropertiesModel {

    private extensionIcon: string;
    private extensionType: string;
    private extensionId: string;
    private extensionCi: boolean;

    public set icon(icon: string) {
        this.extensionIcon = icon;
    }

    public set id(id: string) {
        this.extensionId = id;
    }

    public set type(type: string) {
        this.extensionType = type;
    }

    public set ci(type: string) {
        this.extensionCi = type === "true";
    }

    /**
     * get raw data of model
     *
     * @readonly
     * @type {*}
     * @memberof ExtensionModel
     */
    public get raw(): any {
        return {
            ci:  this.extensionCi,
            icon: this.extensionIcon,
            id  : this.extensionId,
            type: this.extensionType,
        };
    }
}
