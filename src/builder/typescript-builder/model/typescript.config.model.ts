import { ConfigModel } from "../../../model/config.model";

export class TscConfigModel extends ConfigModel {

    /**
     * exclude from node copy process
     *
     * @private
     * @type {string[]}
     * @memberof ConfigModel
     */
    private excludeNcp: string[];

    /**
     * path to typescript compiler
     *
     * @private
     * @type {string}
     * @memberof ConfigModel
     */
    private typescriptCompiler: string;

    /**
     * exclude patterns for node copy
     *
     * @returns {string[]}
     * @memberof ConfigModel
     */
    public getExcludeNcp(): string[] {
        return this.excludeNcp;
    }

    /**
     * get path to typescript compiler
     *
     * @returns {string}
     * @memberof ConfigModel
     */
    public getTypescriptCompiler(): string {
        return this.typescriptCompiler;
    }

    /**
     * set exclude patterns for node copy
     *
     * @param {string[]} patterns
     * @memberof ConfigModel
     */
    public setExcludeNcp(patterns: string[]) {
        this.excludeNcp = patterns;
    }

    /**
     * set path to typescript compiler
     *
     * @param {string} path
     * @memberof ConfigModel
     */
    public setTypescriptCompiler(path: string) {
        this.typescriptCompiler = path;
    }
}
