import { ICommandLineBuilderData } from "../../api/cmdline-observer";
import { Namespaces } from "../../api/namespaces";

export const WebpackProperties: ICommandLineBuilderData = {
    data: [
        {
            name: "entryFile",
            text: "Webpack$ entry file (relative path)",
            validator: (value) => {
                return true;
            },
        },
        {
            name: "outFileName",
            text: "Webpack$ out filename",
            validator: (value) => {
                return true;
            },
        },
        {
            name: "outputDirectory",
            text: "Webpack$ out directory (relative path)",
            validator: (value) => {
                return true;
            },
        },
    ],
    namespace: Namespaces.WEBPACK,
};

export default WebpackProperties;
