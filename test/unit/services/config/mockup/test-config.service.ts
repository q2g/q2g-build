import { IOptionRuleSet } from "../../../../../src/api";
import { ConfigService } from "../../../../../src/services/config.service";
import { TestConfigModel } from "./test-config.model";
import { TestConfigRulesInvalid } from "./test-config.rules";

export class TestConfigService extends ConfigService<TestConfigModel> {

    public static RULES: IOptionRuleSet = TestConfigRulesInvalid;

    protected getConfigRules(): IOptionRuleSet {
        return TestConfigService.RULES;
    }

    protected getConfigModel(): TestConfigModel {
        return new TestConfigModel();
    }
}
