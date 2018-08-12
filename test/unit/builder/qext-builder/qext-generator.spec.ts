import { expect } from "chai";
import { describe, it } from "mocha";
import { resolve } from "path";
import {
    QextConfigurationException,
} from "../../../../src/builder/qext-file-builder/data/exception/qext-config.exception";
import { QextFileBuilder } from "../../../../src/builder/qext-file-builder/qext-file.builder";

describe("QextFileBuilder", () => {

    let builder: QextFileBuilder;

    before( () => {
        builder = new QextFileBuilder();
        builder.initialize({
            builderRoot: "",
            environment: "development",
            projectName: "",
            projectRoot: ".",
        });
    });

    it( "should throw no exception", () => {
        expect( () => {
            builder.configure({
                author: "Ralf Hannuschka",
                description: "Qlik Extension File Test",
                icon: "noIconNow",
                name: "mochaQlik",
                outDirectory: resolve( process.cwd(), "./tmp/myAwesomeExtension/dist"),
                type: "extension",
                version: "1.0.0",
            });
        }).to.not.throw(QextConfigurationException);
    });

    it( "should create qext file", async (done) => {
        await builder.run();
        expect(true).to.be.true;
        // @todo implement check file created ( it has ... )
        done();
    });
});
