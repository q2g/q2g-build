import { Configuration, LoaderOptionsPlugin } from "webpack";
import { baseConfiguration } from "./base.config";

const developmentConfiguration: Configuration = {
    mode: "production" as "production",
};

export default {
    ...baseConfiguration,
    ...developmentConfiguration,
};
