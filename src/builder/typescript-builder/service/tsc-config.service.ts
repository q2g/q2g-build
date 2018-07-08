import { IOptionRuleSet } from "../../../api";
import { ConfigService } from "../../../services/config.service";
import { TscConfigRules } from "../data/tsc.option.rules";
import { TscConfigModel } from "../model/typescript.config.model";

export class TscConfigService extends ConfigService<TscConfigModel> {

    private static instance: TscConfigService;

    constructor() {
        if ( TscConfigService.instance ) {
            throw new Error("could not create instance of TscConfigService. Use TscConfigService.getInstance instead");
        }

        super();
        TscConfigService.instance = this;
        return this;
    }

    protected getConfigRules(): IOptionRuleSet {
        return TscConfigRules;
    }

    protected getConfigModel(): TscConfigModel {
        return new TscConfigModel();
    }
}
