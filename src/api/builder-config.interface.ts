export interface IBuilderConfig {

    /**
     * absolute path to out directory
     *
     * @type {string}
     * @memberof IWebpackConfig
     */
    outDirectory: string;

    /**
     * project root where build process
     * in the most cases the directory where the package.json
     *
     * @type {string}
     * @memberof IWebpackConfig
     */
    projectRoot: string;

    /**
     * absolute path where to find project source files
     * like myProject/src
     *
     * @type {string}
     * @memberof IWebpackConfig
     */
    projectSource: string;

    /**
     * absolute path which tsconfig file should used for
     * webpack typescript plugin
     *
     * @type {string}
     * @memberof IWebpackConfig
     */
    tsConfigFile: string;
}
