import { ConfigModel } from "../../../model/config.model";

export interface IWebpackConfig extends ConfigModel {

    /**
     * webpack entry files to generate multiple bundles
     * nameOfPartialBundle: ["./relative/path/to/file"]
     *
     * @type {{
     *         [name: string]: string[],
     *     }}
     * @memberof IWebpackConfig
     */
    entryFile: {
        [name: string]: string[],
    };

    /**
     * output file name
     *
     * @type {string}
     * @memberof IWebpackConfig
     */
    outFileName: string;

    /**
     * webpack environment
     *
     * @type {("debug" | "development" | "production")}
     * @memberof IWebpackConfig
     */
    environment: "debug" | "development" | "production";
}
