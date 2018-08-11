import { expect } from "chai";
import { describe, it } from "mocha";
import { resolve } from "path";
import { IDataNode } from "../../../../src/api/data-node";
import { QextFileGenerator } from "../../../../src/lib/qext-generator/qext.generator";

describe("QextFileGenerator", () => {

    let generator: QextFileGenerator;
    let expectedData: IDataNode = {};

    before( () => {
        expectedData = {
            author: "1234",
            description: "1234",
            icon: "1234",
            name: "1234",
            type: "1234",
            version: "1234",
        };
    });

    beforeEach( () => {
        generator = new QextFileGenerator();
    });

    describe("Invalid Configuration", () => {

        it( "should throw multiple exceptions missing mandatory property", () => {

            const data: IDataNode = {};
            const expectedExceptions: string[] = [];
            const exceptionsThrown: string[] = [];

            Object.keys(expectedData).forEach( (property: string) => {
                try {
                    expectedExceptions.push(`Missing mandatory property: ${property}`);
                    generator.loadData(data);
                } catch ( e ) {
                    exceptionsThrown.push(e.message);
                }
                data[property] = "mocha";
            });

            expect(exceptionsThrown).to.deep.equal(expectedExceptions);
        });

        // load from file
        it("should load from file and throw exception", () => {
            const filePath = resolve( process.cwd(), "unit/files/qext-config.broken.json");
            expect( () => {
                generator.loadData(filePath);
            }).to.throw("Missing mandatory property: author");
        });

        it( "should throw exception mandatory property could not be empty", () => {

            const data: IDataNode = {
                author: "Lazy Author",
                description: "",
                icon: "noIcon",
                name: "lazy",
                type: "who cares",
                version: "1.0.0",
            };

            expect( () => {
                generator.loadData(data);
            }).to.throw("Mandatory property: description, could not be empty");
        });
    });
});
