import { IBuilderEnvironment } from "./builder-environment.interface";

export enum Builders {
    TYPESCRIPT = "tsc",
    EXTENSION  = "extension",
    WEBPACK    = "webpack",
}

export interface IBuilder {

    configure(config: any): void;

    initialize(baseConfig: IBuilderEnvironment): void;

    run(): Promise<any>;
}
