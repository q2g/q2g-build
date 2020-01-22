import { basename, resolve } from "path";
import { Builders, IBuilder, IBuilderEnvironment } from "../api";
import { IDataNode } from "../api/data-node";
import { ExtensionBuilder,  TypescriptBuilder, WebpackBuilder } from "../builder";

export class BuilderService {

    /**
     * returns a BuilderService instance
     *
     * @static
     * @returns {BuilderService}
     * @memberof BuilderService
     */
    public static getInstance(): BuilderService {
        return BuilderService.instance;
    }

    /**
     * builder service instance
     *
     * @private
     * @static
     * @type {BuilderService}
     * @memberof BuilderService
     */
    private static instance: BuilderService = new BuilderService();

    private builders: Map<string, IBuilder>;

    /**
     * Creates an instance of BuilderService.
     *
     * @private
     * @memberof BuilderService
     */
    private constructor() {
        if ( BuilderService.instance ) {
            throw new Error(
                "could not create instance of BuilderService. Use BuilderService.getInstance() instead");
        }
        this.builders = new Map<string, IBuilder>();
        BuilderService.instance = this;
    }

    /**
     *
     *
     * @param {string} key
     * @param {IBuilder} builder
     * @returns
     * @memberof BuilderService
     */
    public registerBuilder(key: string, builder: IBuilder) {
        if ( ! this.builders.has(key) ) {
            this.builders.set(key, builder);
            return;
        }
        throw new Error(`builder with ${key} allready registered`);
    }

    /**
     * read command line arguments into DataNode
     *
     * @static
     * @param {string[]} args
     * @returns {IDataNode}
     * @memberof OptionHelper
     */
    public readCommandLineArguments(args: string[]): IDataNode {
        const options: IDataNode = {};
        for (let i = 0, ln = args.length; i < ln; i++) {
            const option: string = args[i].slice(2);
            options[option] = args[++i];
        }
        return options;
    }

    /**
     * get a builder instance
     *
     * @param {Builders} type
     * @returns {IBuilder}
     * @memberof BuilderService
     */
    public createBuilder(builderType: string, env: IBuilderEnvironment): IBuilder {

        let builder: IBuilder;

        switch (builderType) {
            case Builders.WEBPACK:    builder = new WebpackBuilder();    break;
            case Builders.EXTENSION:  builder = new ExtensionBuilder();  break;
            case Builders.TYPESCRIPT: builder = new TypescriptBuilder(); break;
            default:
                if ( this.builders.has(builderType) ) {
                   builder = this.builders.get(builderType);
                } else {
                    throw new Error(`Builder for ${builderType}
                        does not exists please use one of these types [webpack, extension]`);
                }
        }

        const builderRootDirectory = env.builderRoot || this.resolveBuilderRootDir();

        builder.initialize({
            builderRoot: builderRootDirectory ,
            environment: env.environment || "development",
            projectName: env.projectName || "q2g-project",
            projectRoot: env.projectRoot || ".",
        });

        return builder;
    }

    /**
     * get directory from this script and go up and search for a directory
     * which is called q2g-build. By general this should be in node_modules
     *
     * @private
     * @returns {string}
     * @memberof BuilderService
     */
    private resolveBuilderRootDir(): string {
        let currentPath = __dirname;
        while (basename(currentPath) !== "q2g-build") {
            currentPath = resolve(currentPath, "..");
        }
        return currentPath;
    }
}
