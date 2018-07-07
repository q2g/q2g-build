import { dirname, resolve } from "path";
import { Config, IDataNode, Log } from "rh-utils";
import { IBuilder, IOption } from "./api";
import { AppConfigProperties, CommandlineOptions } from "./data";
import { OptionHelper } from "./helper";
import { BuilderService } from "./services";

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
 * initialize builder app configuration
 *
 * @param {string} root
 */
function initAppConfiguration(root: string, options) {

    const projectRoot = process.cwd();

    /** create base configuration values */
    configService.set(AppConfigProperties.appRoot, `${root}/bin`);
    configService.set(AppConfigProperties.root, root);
    configService.set(AppConfigProperties.projectRoot , projectRoot );

    const pkgJsonData = OptionHelper.loadFromFile(`${projectRoot}/package.json`);
    configService.set(AppConfigProperties.packageName, pkgJsonData.name );
}

/**
 * read configuration values from tsconfig.json
 *
 * @param {*} tsConfigFile
 * @returns {IDataNode}
 */
function readTypeScriptConfiguration(tsconfig): IDataNode {
    const projectRoot     = configService.get(AppConfigProperties.projectRoot);
    const tsConfigOptions = OptionHelper.loadFromFile(resolve(projectRoot, tsconfig));

    if ( ! tsConfigOptions.hasOwnProperty("compilerOptions") ) {
        tsConfigOptions.compilerOptions = {};
    }

    const outDirectory  = resolve( projectRoot, tsConfigOptions.compilerOptions.outDir || "./dist");
    const projectSource = resolve( projectRoot, tsConfigOptions.compilerOptions.rootDir || "." );
    const tsConfigFile  = resolve( projectRoot, tsconfig);

    return {
        outDirectory,
        projectSource,
        tsConfigFile,
    };
}

/**
 * entry point builder
 *
 * @param {string} scriptPath
 * @param {...string[]} args additional command line arguments
 */
async function main(scriptPath: string, ...args: string[]) {

    const options: IDataNode = OptionHelper.convertCommandlineArguments(args);
    const errors: string[]   = OptionHelper.validateOptions(options, CommandlineOptions);

    if ( errors.length ) {
        process.stderr.write(errors.join("\n"));
        process.exit(1);
    }

    try {
        initAppConfiguration(scriptPath, options);

        const builder: IBuilder = builderService.getBuilder(options.builder);
        let config: IDataNode = {};

        if ( options.hasOwnProperty("config") && options.config ) {
            const configFile = resolve(process.cwd(), options.config);
            config = OptionHelper.loadFromFile(configFile);
        }

        let tsConfig = "tsconfig.json";
        if ( config.hasOwnProperty("tsConfigFile") ) {
            tsConfig = config.tsConfigFile;
        }

        // typescript config rauswerfen
        delete config.tsConfigFile;

        /**
         * combine configuration values
         * get data from tsconfig to determine source folder ( rootDir ) and outDirectory ( outDir )
         * all configuration values will be overriden by config file
         */
        const builderConfig = Object.assign(
            {
                environment: options.env || "development",
                projectRoot: process.cwd(),
            },
            readTypeScriptConfiguration(tsConfig),
            config);

        builder.configure( builderConfig );
        const result = await builder.run();

        process.stdout.write(result);
    } catch ( err ) {
        process.stderr.write(err.toString());
    }
}

/**
 * call main method and pass process arguments, remove first argument
 * since this is only the node excecution file path
 */
main.apply(this, process.argv.slice(1));
