import { Config } from "rh-utils";
import { AppConfigProperties } from "../api";
import { WebpackBuilder } from "../lib";
import { WebpackConfigProperties } from "../lib/webpack-builder/api";

export abstract class BuilderFactory {

    public static createWebpackBuilder(): WebpackBuilder {

        const builder    = new WebpackBuilder();
        const config     = Config.getInstance();
        const sourceRoot = config.get(AppConfigProperties.sourceRoot);

        config.set( WebpackConfigProperties.outDir, `${sourceRoot}/dist`, false);
        config.set( WebpackConfigProperties.loaderContext, `${sourceRoot}/node_modules/q2g-build/node_modules`);
        config.set( WebpackConfigProperties.entry, "./index.ts");
        config.set( WebpackConfigProperties.tsconfig, `${sourceRoot}/tsconfig.json`);
        config.set( WebpackConfigProperties.context, sourceRoot);

        return builder;
    }
}
