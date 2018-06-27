"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const rh_utils_1 = require("rh-utils");
const app_config_1 = require("./model/data/app.config");
const commandline_options_1 = require("./model/data/commandline.options");
const services_1 = require("./services");
const logService = rh_utils_1.Log.getInstance();
const configService = rh_utils_1.Config.getInstance();
const builderService = services_1.BuilderService.getInstance();
const logPath = path_1.resolve(path_1.dirname(__filename), "..");
rh_utils_1.Log.configure({
    LogModule: {
        paths: {
            debug: `${logPath}/log/debug.log`,
            error: `${logPath}/log/error.log`,
        },
    },
});
function initAppConfiguration(root) {
    configService.set(app_config_1.AppConfigProperties.appRoot, `${root}/bin`);
    configService.set(app_config_1.AppConfigProperties.environment, "development");
    configService.set(app_config_1.AppConfigProperties.root, root);
    configService.set(app_config_1.AppConfigProperties.sourceRoot, process.cwd());
    const pkgJsonData = services_1.OptionHelper.loadFromFile(`${process.cwd()}/package.json`);
    configService.set(app_config_1.AppConfigProperties.packageName, pkgJsonData.name);
}
function main(scriptPath, ...args) {
    const options = services_1.OptionHelper.convertCommandlineArguments(args);
    const errors = services_1.OptionHelper.validateOptions(options, commandline_options_1.CommandlineOptions);
    if (errors.length) {
        process.stderr.write(errors.join("\n"));
        process.exit(1);
    }
    try {
        initAppConfiguration(scriptPath);
        const builder = builderService.getBuilder(options.builder);
        if (options.hasOwnProperty("config") && options.config) {
            const configFile = path_1.resolve(process.cwd(), options.config);
            builder.configure(services_1.OptionHelper.loadFromFile(configFile));
        }
        builder.run();
    }
    catch (err) {
        logService.log(`${err}`, rh_utils_1.Log.LOG_ERROR);
    }
}
main.apply(this, process.argv.slice(1));
