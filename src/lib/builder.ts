import { IBuilder } from "../api"

export abstract class Builder implements IBuilder {

    public abstract configure(config): void;

    public abstract run(): void;
}