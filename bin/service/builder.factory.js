"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const rh_utils_1 = require("rh-utils");
const api_1 = require("../api");
const lib_1 = require("../lib");
const api_2 = require("../lib/webpack-builder/api");
class BuilderFactory {
    static createWebpackBuilder() {
        const builder = new lib_1.WebpackBuilder();
        const config = rh_utils_1.Config.getInstance();
        const sourceRoot = config.get(api_1.AppConfigProperties.sourceRoot);
        const q2gBuilderSource = `${sourceRoot}/node_modules/q2g-build`;
        const q2gLoaderContext = path_1.resolve(q2gBuilderSource, "./bin/lib/webpack-builder/loader");
        config.set(api_2.WebpackConfigProperties.outDir, `${sourceRoot}/dist`, false);
        config.set(api_2.WebpackConfigProperties.entry, "./index.ts");
        config.set(api_2.WebpackConfigProperties.tsconfig, `${sourceRoot}/tsconfig.json`);
        config.set(api_2.WebpackConfigProperties.context, sourceRoot);
        config.set(api_2.WebpackConfigProperties.loaderContext, [
            path_1.resolve(q2gBuilderSource, "./node_modules"),
            q2gLoaderContext,
        ]);
        console.log(config.get(api_2.WebpackConfigProperties.loaderContext));
        return builder;
    }
}
exports.BuilderFactory = BuilderFactory;
