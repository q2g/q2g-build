import { IBuilder, IBuilderEnvironment } from "../api";

export abstract class AbstractBuilder implements IBuilder {

    public abstract configure(config: any): void;

    public abstract run(): Promise<string>;

    public initialize(environment: IBuilderEnvironment) {
        this.configure(environment);
    }
}
