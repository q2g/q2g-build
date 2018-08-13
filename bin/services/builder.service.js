"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../api");
const builder_1 = require("../builder");
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
    readCommandLineArguments(args) {
        const options = {};
        for (let i = 0, ln = args.length; i < ln; i++) {
            const option = args[i].slice(2);
            options[option] = args[++i];
        }
        return options;
    }
    createBuilder(type) {
        let builder;
        switch (type) {
            case api_1.Builders.WEBPACK:
                builder = new builder_1.WebpackBuilder();
                break;
            case api_1.Builders.EXTENSION:
                builder = new builder_1.ExtensionBuilder();
                break;
            case api_1.Builders.TYPESCRIPT:
                builder = new builder_1.TypescriptBuilder();
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
