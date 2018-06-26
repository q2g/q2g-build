import { IOption } from "../../api/option.interface";

export const CommandlineOptions: IOption  = {
   builder: {
       required: true,
       values: ["webpack", "extension"],
   },
   config: {
       required: false,
       validator: {
           errorMsg: `Invalid argument for "config", use --config [filename].json\n\n`,
           test: /\.json$/,
       },
   },
};
