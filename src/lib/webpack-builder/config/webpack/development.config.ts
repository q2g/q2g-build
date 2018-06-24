import { Configuration } from "webpack";
import { baseConfiguration } from "./base.config";

const developmentConfiguration: Configuration = {
    mode: "development" as "development",
};

export default {
    ...baseConfiguration,
    ...developmentConfiguration,
};
