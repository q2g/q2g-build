import { IDataNode, Log } from "rh-utils";
import { Compiler, Plugin, Stats } from "webpack";

/**
 * log webpack errors into log/error.log directory
 *
 * @export
 * @class LogPlugin
 * @implements {Plugin}
 */
export class LogPlugin implements Plugin {

    private logService: Log;

    /**
     * Creates an instance of LogPlugin
     *
     * @memberof LogPlugin
     */
    constructor() {
        this.logService = Log.getInstance();
    }

    /**
     * entry point for webpack plugins
     * checks after compilation process has been finished errors
     * exists and logs them into error.log file
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
            this.logService.log(
                errors.join("\n\n"), Log.LOG_ERROR);
        });
    }
}
