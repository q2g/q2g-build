import { existsSync, readFileSync } from "fs";
import { dirname, resolve } from "path";
import { Config, Log } from "rh-utils";
import { AppConfigProperties, Builders, IBuilder, IOptions } from "~/api";
import { validateOptions } from "~/helper";
import { BuilderFactory } from "~/service/builder.factory";

const logService = Log.getInstance();
const configService = Config.getInstance();
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
 * run command line arguments and write them
 * into options
 *
 * @param args
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
 * create builder from factory
 *
 * @param {Builders} builderType
 */
function getBuilder(builderType: Builders): IBuilder {
    let builder: IBuilder;
    switch (builderType) {
        case Builders.WEBPACK:
            logService.log("create webpack build process", Log.LOG_DEBUG);
            builder = BuilderFactory.createWebpackBuilder();
            break;
        default:
            throw new Error("no valid builder selected, add command line option --builder webpack");
    }
    return builder;
}

/**
 * load configuration which was given by options parameter
 *
 * @param configFile
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
 * entry point for builder
 *
 * @param _nodePath node execution file
 * @param scriptPath script which is executed
 * @param args option command line arguments
 */
function main(scriptPath: string, ...args: string[]) {
    const options: IOptions = convertArgumentsToOptions(args);
    const errors = validateOptions(options);

    if ( errors.length ) {
        process.stderr.write(errors.join("\n"));
        process.exit(1);
    }

    try {
        /** create base configuration values */
        configService.set(AppConfigProperties.root, scriptPath);
        configService.set(AppConfigProperties.sourceRoot , process.cwd());
        configService.set(AppConfigProperties.environment , "development");

        const builder = getBuilder(options.builder);

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
main.apply(this, process.argv.slice(1));
