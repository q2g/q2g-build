export class QextPropertiesModel {

    public extensionIcon: string;

    public extensionType: string;

    public extensionId: string;

    public get icon(): string {
        return this.extensionIcon;
    }

    public get id(): string {
        return this.extensionId;
    }

    public get type(): string {
        return this.extensionType;
    }

    public set icon(icon: string) {
        this.extensionIcon = icon;
    }

    public set id(id: string) {
        this.extensionId = id;
    }

    public set type(type: string) {
        this.extensionType = type;
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
            icon: this.icon,
            id  : this.id,
            type: this.type,
        };
    }
}
