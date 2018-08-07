import { Builders, IBuilder } from "../api";
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
        BuilderService.instance = this;
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
    public createBuilder(type: string): IBuilder {

        let builder: IBuilder;
        switch (type) {
            case Builders.WEBPACK:    builder = new WebpackBuilder();    break;
            case Builders.EXTENSION:  builder = new ExtensionBuilder();  break;
            case Builders.TYPESCRIPT: builder = new TypescriptBuilder(); break;
            default:
                throw new Error(`Builder for ${type}
                    does not exists please use one of these types [webpack, extension]`);
        }
        return builder;
    }
}
