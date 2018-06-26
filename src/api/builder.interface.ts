export enum Builders {
    WEBPACK = "webpack",
    EXTENSION = "extension",
}

export interface IBuilder {
    configure(config: any): void;

    run(): void;
}
