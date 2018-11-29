import { ICommandLineBuilderData } from "../../api/cmdline-observer";
import { Namespaces } from "../../api/namespaces";

/**
 * required properties for qext file which will be generated
 * from package.json file
 */
export const QextProperties: ICommandLineBuilderData = {
    data: [
        {
            name: "icon",
            text: "Qext$ icon",
            validator: (value) => {
                return true;
            },
        },
        {
            name: "type",
            text: "Qext$ type",
            validator: (value) => {
                return true;
            },
        },
        {
            name: "id",
            text: "Qext$ id",
            validator: (value) => {
                return true;
            },
        },
    ],
    namespace: Namespaces.QEXT,
};

export default QextProperties;
