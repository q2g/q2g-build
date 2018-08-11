import { IOptionRuleSet } from "../../../api";
import { ConfigService } from "../../../services/config.service";
import { IQextData } from "../api";
import { QextConfigRuleset } from "../data/qext-config.ruleset";
import { QextModel } from "../model/qext.model";

export class QextConfigService extends ConfigService<IQextData> {

    private model: IQextData;

    public constructor() {
        super();
        this.model = new QextModel();
    }

    protected getConfigModel(): IQextData {
        return this.model;
    }

    protected getConfigRules(): IOptionRuleSet {
        return QextConfigRuleset;
    }
}
