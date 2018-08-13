import { expect } from "chai";
import { describe, it } from "mocha";
import { IOptionResult } from "../../../../src/api";
import { TestConfigRulesNotRequired, TestConfigRulesValid } from "./mockup/test-config.rules";
import { TestConfigService } from "./mockup/test-config.service";

describe("Configuration Service", () => {

    describe("Options will have an error", () => {

        let testService: TestConfigService;

        before( () => {
            testService = new TestConfigService();
        });

        it("setOptions should return Array", () => {
            const result: IOptionResult[] = testService.setOptions({
                description: "mocha debug",
                name: "mocha",
            });

            expect( Array.isArray(result) ).to.be.true;
        });

        it("error name should be: name must have 10 chars", () => {
            const result: IOptionResult[] = testService.setOptions({
                description: "mocha debug",
                name: "mocha",
            });

            const errors = result.filter( (optionResult) => {
                return optionResult.name === "name";
            })[0].errors;

            expect(errors).to.deep.equal(["name must have 10 chars"]);
        });

        it("name should not be written to configuration", () => {
            testService.setOptions({
                description: "mocha debug",
                name: "mocha",
            });
            expect(testService.getConfig().getName()).to.be.equal("");
        });

        it("expect 2 errors for description", () => {
            const result: IOptionResult[] = testService.setOptions({
                description: "mocha debug",
                name: "mocha",
            });

            const errors = result.filter( (optionResult) => {
                return optionResult.name === "description";
            })[0].errors;

            expect(errors).to.deep.equal([
                "description could not be empty",
                "20 chars required",
            ]);
        });

        it("description should not be written to configuration", () => {
            testService.setOptions({
                description: "mocha debug",
                name: "mocha",
            });
            expect(testService.getConfig().getDescription()).to.be.equal("");
        });

        it("should throw error description is required", () => {
            const result = testService.setOptions({
                name: "mocha",
            });

            const errors = result.filter( (optionResult) => {
                return optionResult.name === "description";
            })[0].errors;

            expect(errors).to.deep.equal(["required"]);
        });
    });

    describe("Options are valid", () => {

        let testService: TestConfigService;
        let optionResult: IOptionResult[];

        before( () => {
            TestConfigService.RULES = TestConfigRulesValid;
            testService = new TestConfigService();
            optionResult = testService.setOptions({
                description: "mocha testing",
                name: "mocha",
            });
        });

        it("should have no errros", () => {
            const errors = optionResult.filter( (result) => {
                return result.name === "name";
            })[0].errors;

            expect(errors.length).to.equal(0);
        });

        it("should set property name", () => {
            const name = testService.getConfig().getName();
            expect(name).to.be.equal("mocha");
        });

        it("should set property description", () => {
            const name = testService.getConfig().getDescription();
            expect(name).to.be.equal("mocha testing");
        });
    });

    describe("Options are not required", () => {

        let testService: TestConfigService;
        let optionResult: IOptionResult[];

        before( () => {
            TestConfigService.RULES = TestConfigRulesNotRequired;
            testService = new TestConfigService();
            optionResult = testService.setOptions({
                description: undefined,
                name: "mocha",
            });
        });

        it("should have error", () => {
            const errors = optionResult.filter( (result) => {
                return result.name === "name";
            })[0].errors;

            expect(errors.length).to.equal(1);
        });

        it("description should not validated", () => {
            expect(testService.getConfig().getDescription()).to.be.undefined;
        });
    });
});
