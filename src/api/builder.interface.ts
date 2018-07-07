export enum Builders {
    TYPESCRIPT = "tsc",
    EXTENSION  = "extension",
    WEBPACK    = "webpack",
}

export interface IBuilder {
    configure(config: any): void;

    run(): Promise<string>;
}
