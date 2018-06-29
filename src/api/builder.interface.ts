export enum Builders {
    TYPESCRIPT = "typescript",
    EXTENSION  = "extension",
    WEBPACK    = "webpack",
}

export interface IBuilder {
    configure(config: any): void;

    run(): Promise<string>;
}
