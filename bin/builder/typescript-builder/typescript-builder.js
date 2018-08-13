"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const typescript_service_1 = require("./service/typescript.service");
class TypescriptBuilder {
    constructor() {
        this.typescriptService = typescript_service_1.TypescriptService.getInstance();
    }
    configure(config) {
        this.typescriptService.setOptions(Object.assign({}, this.initialConfig, config));
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            this.typescriptService.clearDistDirectory();
            try {
                yield this.typescriptService.compileTypescriptFiles();
                yield this.typescriptService.deployBinaryFiles();
                return "completed";
            }
            catch (error) {
                return error;
            }
        });
    }
    initialize(environment) {
        const typeScriptModulePath = "node_modules/typescript/bin/tsc";
        let pathTypescriptCompiler = path_1.resolve(environment.projectRoot, `./${typeScriptModulePath}`);
        if (!fs_1.existsSync(pathTypescriptCompiler)) {
            pathTypescriptCompiler = path_1.resolve(environment.builderRoot, `../${typeScriptModulePath}`);
        }
        this.initialConfig = {
            typescriptCompiler: pathTypescriptCompiler,
        };
    }
}
exports.TypescriptBuilder = TypescriptBuilder;
