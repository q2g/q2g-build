import { ICommandLineBuilderData } from "../../api/cmdline-observer";
import { Namespaces } from "../../api/namespaces";

export const WebpackProperties: ICommandLineBuilderData = {
    data: [
        {
            name: "entryFile",
            text: "relative path to entry file",
            validator: (value) => {
                return true;
            },
        },
        {
            name: "outFileName",
            text: "name of the output file",
            validator: (value) => {
                return true;
            },
        },
        {
            name: "outputDirectory",
            text: "relative path to output directory (will be created if not exists)",
            validator: (value) => {
                return true;
            },
        },
    ],
    namespace: Namespaces.WEBPACK,
};

export default WebpackProperties;
