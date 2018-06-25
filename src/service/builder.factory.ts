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

        /** @var {string} q2gBuilderSource q2g-build path in source package node_modules folder */
        const q2gBuilderSource = `${sourceRoot}/node_modules/q2g-build`;

        /** @var {string} q2gLoaderContext own loader paths */
        const q2gLoaderContext = resolve(q2gBuilderSource, "./bin/lib/webpack-builder/loader");

        config.set( WebpackConfigProperties.outDir, `${sourceRoot}/dist`, false);
        config.set( WebpackConfigProperties.entry, "./index.ts");
        config.set( WebpackConfigProperties.tsconfig, `${sourceRoot}/tsconfig.json`);
        config.set( WebpackConfigProperties.context, sourceRoot);

        /** set loader context paths where to search loaders */
        config.set( WebpackConfigProperties.loaderContext, [
            resolve(q2gBuilderSource, "./node_modules"), // where to find vendor loaders (less, css or ts-loader)
            q2gLoaderContext, // where to find own q2g-builder/webpack-loaders
        ]);
        return builder;
    }
}
