"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const services_1 = require("./services");
const builderService = services_1.BuilderService.getInstance();
function loadFromFile(configFile) {
    if (!fs_1.existsSync(configFile)) {
        throw new Error(`configuration file ${configFile} not exists. Please check your
            command line arguments for --config.\n\n`);
    }
    const configData = fs_1.readFileSync(configFile, {
        encoding: "utf8"
    });
    return JSON.parse(configData);
}
function getProjectName() {
    const packageJSON = path_1.resolve(process.cwd(), "./package.json");
    const fileData = loadFromFile(packageJSON);
    return fileData.name;
}
function getBuilderConfiguration(path) {
    if (!path) {
        return {};
    }
    const projectRoot = process.cwd();
    const builderConfig = loadFromFile(path_1.resolve(projectRoot, path));
    const tsConfigOptions = loadFromFile(path_1.resolve(projectRoot, builderConfig.tsConfigFile || "tsconfig.json"));
    if (!tsConfigOptions.hasOwnProperty("compilerOptions")) {
        tsConfigOptions.compilerOptions = {};
    }
    const outDir = builderConfig.outDirectory || tsConfigOptions.compilerOptions.outDir || "./dist";
    const projectSource = tsConfigOptions.compilerOptions.rootDir || ".";
    const tsConfigFile = builderConfig.tsConfigFile || "tsconfig.json";
    const tsConfigValues = {
        outDirectory: path_1.resolve(projectRoot, outDir),
        projectSource: path_1.resolve(projectRoot, projectSource),
        tsConfigFile: path_1.resolve(projectRoot, tsConfigFile),
    };
    return Object.assign({}, builderConfig, tsConfigValues);
}
function main(root, ...args) {
    return __awaiter(this, void 0, void 0, function* () {
        const commandLineOptions = builderService.readCommandLineArguments(args);
        const builderType = commandLineOptions.builder;
        const configFile = commandLineOptions.config;
        if (!builderType) {
            process.exit(1);
        }
        const baseConfig = {
            builderRoot: `${root}/bin`,
            environment: commandLineOptions.env || "development",
            projectName: getProjectName(),
            projectRoot: process.cwd(),
        };
        try {
            const builder = builderService.createBuilder(builderType);
            builder.initialize(baseConfig);
            builder.configure(getBuilderConfiguration(configFile));
            yield builder.run();
            process.exit(0);
        }
        catch (err) {
            process.stderr.write(err.toString());
            process.exit(1);
        }
    });
}
main.apply(this, process.argv.slice(1));
