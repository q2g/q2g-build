import * as nodeCopy from "ncp";
import { resolve } from "path";

export class DeployHelper {

    /**
     * remove directory
     *
     * @static
     * @memberof DeployHelper
     */
    public static removeDirectory() {
        // not empty
    }

    /**
     * copy files via ncp from source to target directory
     *
     * @static
     * @param {string} source
     * @param {string} target
     * @param {string} filter
     *
     * @returns {Promise<string>}
     * @memberof DeployHelper
     */
    public static copyFiles( sourceDir: string, targetDir: string, filterPattern?: RegExp): Promise<string> {

        const sourceDirectory: string      = sourceDir;
        const targetDirectory: string = targetDir;
        const filter: RegExp         = filterPattern;

        const options = {
            filter: (source: string): boolean => {
                if ( source.match(filter) ) {
                    return false;
                }
                return true;
            },
        };

        return new Promise( (success, reject) => {
            nodeCopy(sourceDirectory, targetDirectory, options, () => {
                success("all is done");
            });
        });
    }

    /**
     * create regexp for node copy to exclude node_modules and all type script files
     * and all files which are set via excludeNcp Option
     *
     * @static
     * @param {string[]} excludes
     * @returns {RegExp}
     * @memberof DeployHelper
     */
    public static createNcpExcludeRegExp(excludes: string[]): RegExp {
        const excludeNcpPattern: string = excludes.reduce(
            (pattern, exclude) => {
                let sanitizedPattern = exclude
                    .replace(/(\.|\/|\\)/g, "\\$1") // add slashes to dot, slash or backslash
                    .replace(/(\*)\*?/g, ".\$1?");  // replace asterisk(s) by .*?

                // add $ at the end for possible file
                if ( exclude.match(/\.[a-z]{1,}$/i) ) {
                    sanitizedPattern = sanitizedPattern.concat("$");
                }

                return pattern.concat("|", sanitizedPattern);
            }, "node_modules");

        return new RegExp(excludeNcpPattern);
    }
}
