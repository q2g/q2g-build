import { dirname, resolve } from "path";
import { BuilderFactory } from "./service/builder.factory";
import { IOptions, Builders, IBuilder, NAMESPACE_BASE_CONFIGURATION } from "./api";
import { Log, Config } from "rh-utils";
import { validateOptions } from './helper/option.validator';
import { existsSync, readFileSync } from "fs";

const logService = Log.getInstance();
const configService = Config.getInstance();
const logPath = resolve( dirname(__filename), '..');

Log.configure({
    LogModule: {
        paths: {
            debug: `${logPath}/log/debug.log`,
            error: `${logPath}/log/error.log`
        }
    }
});

/**
 * run command line arguments and write them 
 * into options
 * 
 * @param args
 */
function convertArgumentsToOptions(args): IOptions
{
    const options = {};
    for( let i = 0, ln = args.length; i < ln; i++ ) {
        const option = args[i].slice(2);
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
            logService.log('create webpack build process', Log.LOG_DEBUG);
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
function loadConfigurationFromFile(configFile) {

    if ( ! existsSync(configFile) ) {
        throw new Error(`configuration file ${configFile} not exists. Please check your command line arguments for --config.\n\n`);
    }

    const configData = readFileSync(configFile, {
        encoding: "utf8"
    });

    return JSON.parse(configData);
}

function main(node, scriptPath, ...args) {
    const options: IOptions = convertArgumentsToOptions(args);
    const errors = validateOptions(options);

    if ( errors.length ) {
        process.stderr.write(errors.join('\n'));
        process.exit(1);
    }

    try {
        /** create base configuration values */
        configService.set(NAMESPACE_BASE_CONFIGURATION.BUILDER_ROOT, scriptPath);
        configService.set(NAMESPACE_BASE_CONFIGURATION.SOURCE_ROOT , process.cwd());
        configService.set(NAMESPACE_BASE_CONFIGURATION.ENVIRONMENT , 'development');

        const builder = getBuilder(options.builder);

        if ( options.hasOwnProperty('config') && options.config ) {
            const configFile = resolve(process.cwd(), options.config);
            builder.configure(
                loadConfigurationFromFile(configFile));
        }

        builder.run();
    } catch ( err ) {
        logService.log(`${err}`, Log.LOG_ERROR);
    }
}
main.apply(this, process.argv);


