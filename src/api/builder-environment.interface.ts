export interface IBuilderEnvironment {

    /**
     * builder root directory
     *
     * @type {string}
     * @memberof IBuilderEnvironment
     */
    builderRoot?: string;

    /**
     * envrionment mode
     *
     * @type {("debug" | "development" | "production")}
     * @memberof IBuilderEnvironment
     */
    environment: "debug" | "development" | "production";

    /**
     * project name which should builded
     *
     * @type {string}
     * @memberof IBuilderEnvironment
     */
    projectName?: string;

    /**
     * project root which should be created
     *
     * @type {string}
     * @memberof IBuilderEnvironment
     */
    projectRoot: string;
}
