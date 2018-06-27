"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../api");
const extension_builder_1 = require("../lib/extension-builder/extension-builder");
const webpack_builder_1 = require("../lib/webpack-builder");
class BuilderService {
    constructor() {
        if (BuilderService.instance) {
            throw new Error("could not create instance of BuilderService. Use BuilderService.getInstance() instead");
        }
        BuilderService.instance = this;
    }
    static getInstance() {
        return BuilderService.instance;
    }
    getBuilder(type) {
        let builder;
        switch (type) {
            case api_1.Builders.WEBPACK:
                builder = new webpack_builder_1.WebpackBuilder();
                break;
            case api_1.Builders.EXTENSION:
                builder = new extension_builder_1.ExtensionBuilder();
                break;
            default:
                throw new Error(`Builder for ${type}
                    does not exists please use one of these types [webpack, extension]`);
        }
        return builder;
    }
}
BuilderService.instance = new BuilderService();
exports.BuilderService = BuilderService;
