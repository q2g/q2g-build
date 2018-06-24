import { WebpackBuilder } from "@webpack-builder";
import { WebpackConfigProperties } from "@webpack-builder/api";
import { AppConfigProperties } from "api";
import { Config } from "rh-utils";

export abstract class BuilderFactory {

    public static createWebpackBuilder(): WebpackBuilder {

        const builder    = new WebpackBuilder();
        const config     = Config.getInstance();
        const sourceRoot = config.get(AppConfigProperties.sourceRoot);

        config.set( WebpackConfigProperties.outDir, `${sourceRoot}/dist`, false);

        return builder;
    }
}
