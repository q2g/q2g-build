export enum Builders 
{ 
    WEBPACK = "webpack" 
};

export interface IBuilder
{
    configure(config: any): void;

    run(): void;
}