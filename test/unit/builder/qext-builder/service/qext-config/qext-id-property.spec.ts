import { expect } from "chai";
import { describe, it } from "mocha";
import { IOptionResult } from "../../../../../../src/api";
import { IQextData } from "../../../../../../src/builder/qext-file-builder/api";
import { QextConfigService } from "../../../../../../src/builder/qext-file-builder/services/qext-config.service";

describe("qext-config service: qext-id", () => {

    let baseConfig: IQextData;

    let config: QextConfigService;

    beforeEach( () => {
        baseConfig = {
            author: "q2g team",
            description: "qext id test",
            icon: "my icon",
            name: "qext id testing",
            type: "mocha test",
            version: "1.0.0",
        };

        config = QextConfigService.getInstance();
    });

    it("should be mandatory", () => {
        const optionResult: IOptionResult = config.setOptions(baseConfig).filter( (result) => {
            return result.name === "id";
        })[0];
        // tslint:disable-next-line:no-unused-expression
        expect(optionResult.errors).to.deep.equal(["required"]);
    });

    it("should display error not empty", () => {
        baseConfig.id = "";
        const optionResult: IOptionResult = config.setOptions(baseConfig).filter( (result) => {
            return result.name === "id";
        })[0];

        // tslint:disable-next-line:no-unused-expression
        expect(optionResult.errors).to.deep.equal(["not empty"]);
    });

    it("should display error no whitespaces", () => {
        baseConfig.id = "i should have no whitespaces";
        const optionResult: IOptionResult = config.setOptions(baseConfig).filter( (result) => {
            return result.name === "id";
        })[0];

        // tslint:disable-next-line:no-unused-expression
        expect(optionResult.errors).to.deep.equal(["no whitespaces allowed"]);
    });

    it("should have configuration value id with q2g-mocha", () => {
        baseConfig.id = "q2g-mocha";
        const optionResult: IOptionResult = config.setOptions(baseConfig).filter( (result) => {
            return result.name === "id";
        })[0];

        expect(config.getConfig().getId()).to.be.equal("q2g-mocha");
    });
});
