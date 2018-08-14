import { existsSync, readdirSync, rmdirSync, statSync, unlinkSync } from "fs";
import * as nodeCopy from "ncp";
import { resolve } from "path";

export class DeployHelper {

    /**
     * delete a directory sync
     *
     * @static
     * @memberof DeployHelper
     */
    public static removeDirectory(dir: string) {

        if ( ! existsSync(dir) ) {
            return;
        }

        const files = readdirSync(dir);

        if ( files.length > 0 ) {
            files.forEach( (file) => {
                const filePath = resolve(dir, file);
                const fileStat = statSync(filePath);

                if ( fileStat.isDirectory() ) {
                    DeployHelper.removeDirectory(filePath);
                } else {
                    unlinkSync(filePath);
                }
            });
        }
        rmdirSync(dir);
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
    public static copyFiles( sourceDir: string, targetDir: string, filterPattern: RegExp): Promise<string> {

        const sourceDirectory: string = sourceDir;
        const targetDirectory: string = targetDir;
        const filter: RegExp          = filterPattern;

        const options = {
            filter: (source: string): boolean => {
                if ( filter && source.match(filter) ) {
                    return false;
                }
                return true;
            },
        };

        return new Promise( (success) => {
            nodeCopy(sourceDirectory, targetDirectory, options, () => {
                success("done");
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
