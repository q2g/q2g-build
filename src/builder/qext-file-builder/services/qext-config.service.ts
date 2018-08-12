import { IOptionRuleSet } from "../../../api";
import { IDataNode } from "../../../api/data-node";
import { ConfigService } from "../../../services/config.service";
import { QextConfigRuleset } from "../data/qext-config.ruleset";
import { QextFileProperties } from "../data/qext-file.properties";
import { QextConfigModel } from "../model/qext-config.model";

export class QextConfigService extends ConfigService<QextConfigModel> {

    public static getInstance(): QextConfigService {
        return this.instance;
    }

    private static instance: QextConfigService = new QextConfigService();

    private constructor() {
        if ( QextConfigService.instance ) {
            throw new Error(`could not create instance of QextConfigService.
             Use QextConfigService.getInstance instead.`);
        }
        super();
        QextConfigService.instance = this;
    }

    /**
     * convert configuration data to json
     *
     * @returns {IDataNode}
     * @memberof ConfigService
     */
    public toJson(): IDataNode {

        const data: IDataNode = {};
        const configOptions = this.getConfigRules();

        Object.keys(QextFileProperties).forEach( (option: string) => {
            const setting      = QextFileProperties[option];
            const rule         = configOptions[setting];
            const getterMethod = `get${setting.charAt(0).toUpperCase()}${setting.slice(1)}`;
            const methodExists = Object.prototype.toString.call(
                this.configModel[getterMethod]).slice(8, -1) === "Function";

            const value = methodExists ? this.configModel[getterMethod]() : "";

            if ( rule.required || value !== undefined ) {
                data[setting] = value;
            }
        });
        return data;
    }

    protected getConfigModel(): QextConfigModel {
        return new QextConfigModel();
    }

    protected getConfigRules(): IOptionRuleSet {
        return QextConfigRuleset;
    }
}
