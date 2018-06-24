import { IBuilder, IDataNode } from "../api";

export abstract class Builder implements IBuilder {

    public abstract configure(config: IDataNode): void;

    public abstract run(): void;
}
