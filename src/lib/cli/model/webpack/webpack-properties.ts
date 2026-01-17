import { isAbsolute } from "path";
import { ICommandLineBuilderData } from "../../api/cmdline-observer";
import { Namespaces } from "../../api/namespaces";

export const WebpackProperties: ICommandLineBuilderData = {
    data: [
        {
            name: "entryFile",
            text: "Webpack$ entry file (relative path)",
            validator: (value): boolean => {
                return !isAbsolute(value) && Array.isArray(value.match(/^\.(?=\/)/));
            },
        },
        {
            name: "outFileName",
            text: "Webpack$ out filename",
            validator: (value) => {
                return value.length > 0;
            },
        },
        {
            name: "outputDirectory",
            text: "Webpack$ out directory (relative path)",
            validator: (value) => {
                return !isAbsolute(value) && Array.isArray(value.match(/^\.(?=\/)/));
            },
        },
        {
            name: "watch",
            text: "Webpack$ enable watchmode (true|false) only development mode",
            validator: (value) => {
                return value === "true" || value === "false";
            },
            value: "false",
        },
    ],
    namespace: Namespaces.WEBPACK,
};

export default WebpackProperties;
