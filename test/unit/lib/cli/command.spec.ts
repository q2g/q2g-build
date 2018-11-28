import { expect } from "chai";
import { exec } from "child_process";

describe("Qlik2Go Cli", () => {

    describe("Qlik2Go Build: base spec", () => {

        it("q2gb should be callalbe from command line", (done) => {
            exec("q2gb", (
                error,
            ) => {
                // tslint:disable-next-line:no-unused-expression
                expect(error).to.be.null;
                done();
            });
        });

        it("should print possible options if no arguments are passed", (done) => {
            exec("q2gb", (
                error,
                stdout,
            ) => {

                const out = stdout.replace(/(\r|\n)/g, "");
                expect(out).to.be.equal("--init <extension|webpack> initializes new build");
                done();
            });
        });

        it("should exited with error if unknown command is called", (done) => {
            exec("q2gb --unknown", (
                error,
                stdout,
                stderr,
            ) => {
                // tslint:disable-next-line:no-unused-expression
                expect(error).to.be.not.null;
                expect(stderr).to.be.equal("Unknown command: unknown");
                done();
            });
        });
    });

    describe("Qlik2Go Build: init", () => {

        it("should exited with an error if either extension or webpack is given", (done) => {
            exec("q2gb --init", (error, stdout, stderr) => {
                // tslint:disable-next-line:no-unused-expression
                expect(error).to.be.not.null;
                expect(stderr).to.equal("invalid argument for init, call with --init <extension|webpack>");
                done();
            });
        });
    });
});
