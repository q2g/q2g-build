import { expect } from "chai";
import { describe, it } from "mocha";
import { IOptionResult } from "../../../../src/api";
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
    });

    describe("Options will have an error", () => {

        let testService: TestConfigService;

        before( () => {
            testService = new TestConfigService();
        });
    });
});
