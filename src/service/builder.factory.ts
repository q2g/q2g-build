import { Config } from "rh-utils";
import { WebpackBuilder } from "../lib";
import { 
    NAMESPACE_BASE_CONFIGURATION,
    NAMESPACE_WEBPACK_CONFIGURATION
} from "../api"

export abstract class BuilderFactory
{
    public static createWebpackBuilder(): WebpackBuilder 
    {
        const builder = new WebpackBuilder();
        const configService = Config.getInstance();
        const builderRoot = configService.get(NAMESPACE_BASE_CONFIGURATION.BUILDER_ROOT);
        const sourceRoot  = configService.get(NAMESPACE_BASE_CONFIGURATION.SOURCE_ROOT);

        /** set loader resolver path */
        configService.set(
            NAMESPACE_WEBPACK_CONFIGURATION.LOADER_RESOLVER, `${builderRoot}/node_modules`); 

        if ( configService.has(NAMESPACE_WEBPACK_CONFIGURATION.SOURCE_ROOT) ) {
            /** set source root path */
            configService.set(
                NAMESPACE_WEBPACK_CONFIGURATION.SOURCE_ROOT, sourceRoot);
        }
        return builder;
    }
}
