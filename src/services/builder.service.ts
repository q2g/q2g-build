import { Builders, IBuilder } from "../api";
import { ExtensionBuilder,  TypescriptBuilder, WebpackBuilder } from "../lib";

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
     * get a builder instance
     *
     * @param {Builders} type
     * @returns {IBuilder}
     * @memberof BuilderService
     */
    public getBuilder(type: Builders): IBuilder {
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
