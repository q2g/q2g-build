"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../api");
const webpack_builder_1 = require("./webpack-builder");
class Builder {
    constructor() {
        console.log("test");
    }
    static getBuilder(type) {
        let builder;
        switch (type) {
            case api_1.Builders.WEBPACK:
                builder = new webpack_builder_1.WebpackBuilder();
                break;
            default:
                throw new Error(`Builder for ${type} does not exists please use one of these types ${api_1.Builders}`);
        }
        return builder;
    }
}
exports.Builder = Builder;
