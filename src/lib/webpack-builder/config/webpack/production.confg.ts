import { Configuration } from "webpack";
import { baseConfiguration } from "./base.config";

const productionConfig: Configuration = {
    mode: "production" as "production",
};

export default {
    ...baseConfiguration,
    ...productionConfig,
};
