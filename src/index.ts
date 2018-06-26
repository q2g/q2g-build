import { existsSync, readFileSync } from "fs";
import { dirname, resolve } from "path";
import { Config, Log } from "rh-utils";
import { AppConfigProperties, Builders, IBuilder, IOptions } from "./api";
import { validateOptions } from "./helper";
import { BuilderService } from "./service/builder.service";

const logService     = Log.getInstance();
const configService  = Config.getInstance();
const builderService = BuilderService.getInstance();
const logPath = resolve( dirname(__filename), "..");

Log.configure({
    LogModule: {
        paths: {
            debug: `${logPath}/log/debug.log`,
            error: `${logPath}/log/error.log`,
        },
    },
});

/**
 * convert command line arguments in Options and
 * filter out only valid options
 *
 * @param {string[]} args
 * @returns {IOptions}
 */
function convertArgumentsToOptions(args: string[]): IOptions {
    const options: {[key: string]: any} = {};
    for (let i = 0, ln = args.length; i < ln; i++) {
        const option: string = args[i].slice(2);
        options[option] = args[++i];
    }

    return options as IOptions;
}

/**
 * load configuration file which can passed via command line
 * arguments with --config config.json
 *
 * @param {string} configFile
 * @returns
 */
function loadConfigurationFromFile(configFile: string) {

    if ( ! existsSync(configFile) ) {
        throw new Error(
            `configuration file ${configFile} not exists. Please check your command line arguments for --config.\n\n`);
    }

    const configData = readFileSync(configFile, {
        encoding: "utf8" });

    return JSON.parse(configData);
}

/**
 * initialize builder app configuration
 *
 * @param {string} root
 */
function initAppConfiguration(root: string) {
    /** create base configuration values */
    configService.set(AppConfigProperties.appRoot, `${root}/bin`);
    configService.set(AppConfigProperties.environment , "development");
    configService.set(AppConfigProperties.root, root);
    configService.set(AppConfigProperties.sourceRoot , process.cwd());
}

/**
 * entry point builder
 *
 * @param {string} scriptPath
 * @param {...string[]} args additional command line arguments
 */
function main(scriptPath: string, ...args: string[]) {

    const options: IOptions = convertArgumentsToOptions(args);
    const errors = validateOptions(options);

    if ( errors.length ) {
        process.stderr.write(errors.join("\n"));
        process.exit(1);
    }

    try {
        initAppConfiguration(scriptPath);

        const builder: IBuilder = builderService.getBuilder(options.builder);

        if ( options.hasOwnProperty("config") && options.config ) {
            const configFile = resolve(process.cwd(), options.config);
            builder.configure(
                loadConfigurationFromFile(configFile));
        }

        builder.run();
    } catch ( err ) {
        logService.log(`${err}`, Log.LOG_ERROR);
    }
}
/**
 * call main method and pass process arguments, remove first argument
 * since this is only the node excecution file path
 */
main.apply(this, process.argv.slice(1));
