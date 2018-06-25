import { resolve } from "path";
import { Config } from "rh-utils";
import { AppConfigProperties } from "../api";
import { WebpackBuilder } from "../lib";
import { WebpackConfigProperties } from "../lib/webpack-builder/api";

export abstract class BuilderFactory {

    public static createWebpackBuilder(): WebpackBuilder {

        const builder          = new WebpackBuilder();
        const config           = Config.getInstance();
        const sourceRoot       = config.get(AppConfigProperties.sourceRoot);
        const q2gBuilderSource = `${sourceRoot}/node_modules/q2g-build/node_modules`;
        const q2gLoaderContext = resolve(q2gBuilderSource, "../bin/lib/webpack-builder/loader");

        config.set( WebpackConfigProperties.outDir, `${sourceRoot}/dist`, false);
        config.set( WebpackConfigProperties.entry, "./index.ts");
        config.set( WebpackConfigProperties.tsconfig, `${sourceRoot}/tsconfig.json`);
        config.set( WebpackConfigProperties.context, sourceRoot);

        /** set loader context paths where to search loaders */
        config.set( WebpackConfigProperties.loaderContext, [q2gBuilderSource, q2gLoaderContext]);

        console.log(config.get(WebpackConfigProperties.loaderContext));

        return builder;
    }
}
