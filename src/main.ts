import * as copyfiles from "copyfiles";
import { existsSync, readFileSync } from "fs";
import { resolve } from "path";
import { IBuilder, IBuilderEnvironment } from "./api";
import { IDataNode } from "./api/data-node";
import { BuilderService } from "./services";

const builderService = BuilderService.getInstance();

/**
 * load options from file
 *
 * @static
 * @param {string} configFile
 * @returns {IDataNode}
 * @memberof OptionHelper
 */
function loadFromFile(configFile: string): IDataNode {

    if ( ! existsSync(configFile) ) {
        throw new Error(
            `configuration file ${configFile} not exists. Please check your
            command line arguments for --config.\n\n`);
    }

    const configData = readFileSync(configFile, {
        encoding: "utf8" });

    try {
        return JSON.parse(configData);
    } catch (error) {
        // tslint:disable-next-line:no-console
        process.stderr.write(`Could not parse json in ${configFile}.`);
        throw error;
    }
}

/**
 *
 *
 * @returns {string}
 */
function getProjectName(): string {
    const packageJSON = resolve(process.cwd(), "./package.json");
    const fileData = loadFromFile(packageJSON);

    return fileData.name;
}

/**
 * create builder configuration data
 *
 * @param {*} path
 * @returns {IDataNode}
 */
function getBuilderConfiguration(path): IDataNode {

    if ( ! path ) {
        return {};
    }

    const projectRoot     = process.cwd();
    const builderConfig   = loadFromFile(resolve(projectRoot, path));
    const tsConfigOptions = loadFromFile(resolve(projectRoot, builderConfig.tsConfigFile || "tsconfig.json"));

    if (!tsConfigOptions.hasOwnProperty("compilerOptions") ) {
        tsConfigOptions.compilerOptions = {};
    }

    const outDir        = builderConfig.outDirectory              || tsConfigOptions.compilerOptions.outDir || "./dist";
    const projectSource = tsConfigOptions.compilerOptions.rootDir || ".";
    const tsConfigFile  = builderConfig.tsConfigFile              || "tsconfig.json";

    const tsConfigValues = {
        outDirectory  : resolve( projectRoot, outDir),
        projectSource : resolve( projectRoot, projectSource),
        tsConfigFile  : resolve( projectRoot, tsConfigFile),
    };

    // merge tsconfig values and builder config
    return { ...builderConfig, ...tsConfigValues};
}

/**
 * entry point builder
 *
 * @param {string} scriptPath
 * @param {...string[]} args additional command line arguments
 */
async function main(root: string, ...args: string[]) {

    copyfiles([
        resolve(__dirname, "typings/*.d.ts"),
        resolve(process.cwd(), "node_modules/@types", "q2gb"),
    ], true, () => void 0);

    const commandLineOptions  = builderService.readCommandLineArguments(args);
    const builderType: string = commandLineOptions.builder;
    const configFile: string  = commandLineOptions.config;

    if ( ! builderType ) {
        process.exit(1);
    }

    const baseConfig: IBuilderEnvironment = {
        environment: commandLineOptions.env || "development",
        projectName: getProjectName(),
        projectRoot: process.cwd(),
    };

    try {
        const builder: IBuilder = builderService.createBuilder(builderType, baseConfig);
        builder.configure( getBuilderConfiguration(configFile) );
        await builder.run();
        process.exit(0);
    } catch ( err ) {
        process.stderr.write(err.toString());
        process.exit(1);
    }
}

/**
 * call main method and pass process arguments, remove first argument
 * since this is only the node excecution file path
 */
main.apply(this, process.argv.slice(1));
