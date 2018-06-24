import { Configuration, LoaderOptionsPlugin } from "webpack";
import { baseConfiguration } from "./base.config";

const developmentConfiguration: Configuration = {
    mode: "production" as "production",

    plugins: [
        new LoaderOptionsPlugin({
            debug: true,
        }),
    ],
};

export default {
    ...baseConfiguration,
    ...developmentConfiguration,
};
