import { IOptionRuleSet } from "../api/option-rule.interface";
import { ValidationHelper } from "../helper";

export const CommandlineOptions: IOptionRuleSet  = {
   builder: {
       required: true,
       validatorFn: ValidationHelper.containsValue(
            ["webpack", "extension", "tsc"]),
   },
   config: {
       required: false,
   },
   env: {
       required: false,
       validatorFn: ValidationHelper.containsValue(
            ["development", "production"]),
   },
};
