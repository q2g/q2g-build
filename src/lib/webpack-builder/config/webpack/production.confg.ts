import { Configuration } from "webpack";
import { baseConfiguration } from "./base.config";

/**
 * dont use plugins here since it will override default configuration plugins
 * we need to add them seperatly
 */
const productionConfig: Configuration = {
    mode: "production" as "production",
};

export default {
    ...baseConfiguration,
    ...productionConfig,
};
