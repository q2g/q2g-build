import { IOption } from "../api/option.interface";
import { ValidationHelper } from "../helper";

export const CommandlineOptions: IOption  = {
   builder: {
       required: true,
       values: ["webpack", "extension", "tsc"],
   },
   config: {
       required: false,
       validator: {
           errorMsg: `Invalid argument for "config", use --config [filename].json\n\n`,
           test: /\.json$/,
       },
   },
   env: {
       required: false,
       values: ["development", "production"],
   },
   sourceRoot: {
       required: false,
       validator: {
           errorMsg: `source root parameter should be a relative path.`,
           validatorFn: ValidationHelper.relativePath,
       },
   },
};
