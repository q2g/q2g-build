import { Configuration, Plugin } from "webpack";
import { LogPlugin } from "../../plugins/log.plugin";
import { baseConfiguration } from "./base.config";

/** @var {Plugin[]} basePlugins default plugins to merge with development plugins */
const basePlugins: Plugin[] = [
    ...baseConfiguration.plugins,
];

/** @var {Plugin[]} developmentPlugins additional development plugins for webpack */
const developmentPlugins: Plugin[] = [
    new LogPlugin(),
];

/** @var {Configuration} developmentConfiguration dev configuration for webpack */
const developmentConfiguration: Configuration = {
    mode: "production" as "production",
    plugins: [...basePlugins, ...developmentPlugins],
};

export default {
    ...baseConfiguration,
    ...developmentConfiguration,
};
