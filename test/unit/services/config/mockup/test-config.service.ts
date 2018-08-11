import { IOptionRuleSet } from "../../../../../src/api";
import { ConfigService } from "../../../../../src/services/config.service";
import { TestConfigModel } from "./test-config.model";
import { TestConfigRulesInvalid } from "./test-config.rules";

export class TestConfigService extends ConfigService<TestConfigModel> {

    protected getConfigRules(): IOptionRuleSet {
        return TestConfigRulesInvalid;
    }

    protected getConfigModel(): TestConfigModel {
        return new TestConfigModel();
    }
}
