import { Compiler, Plugin, Stats } from "webpack";
import { IDataNode } from "../../../api/data-node";

/**
 * log webpack errors into log/error.log directory
 *
 * @export
 * @class LogPlugin
 * @implements {Plugin}
 */
export class LogPlugin implements Plugin {

    /**
     * entry point for webpack plugins
     * checks after compilation process has been finished errors
     * exists
     *
     * @todo implement logger again
     *
     * @param {Compiler} compiler
     * @memberof LogPlugin
     */
    public apply(compiler: Compiler) {
        compiler.hooks.done.tap("CompilerDone", (result: Stats) => {

            if ( ! result.hasErrors() ) {
                return;
            }

            const statsJson: Stats.ToJsonOptions = result.toJson();
            const stats = statsJson.valueOf() as IDataNode;
            const errors: string[] = stats.errors;

            console.log(stats);

            throw new Error("fail");
        });
    }
}
