import { ICommandLineBuilderData } from "../../api/cmdline-observer";
import { Namespaces } from "../../api/namespaces";

/**
 * required properties for qext file which will be generated
 * from package.json file
 */
export const CIProperties: ICommandLineBuilderData = {
    data: [
        {
            name: "ci",
            text: "CI$ enable continues integration to qlik sense / qrs",
            validator: (value) => {
                return value.length > 0;
            },
            value: "false",
        },
    ],
    namespace: Namespaces.CI,
};
