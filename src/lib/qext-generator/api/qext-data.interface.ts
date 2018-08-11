import { IDataNode } from "../../../api/data-node";

export interface IQextData {

    getAuthor(): string;

    getDescription(): string;

    getIcon(): string;

    getName(): string;

    getType(): string;

    getVersion(): string;

    getPreview(): string;

    getHomepage(): string;

    getKeywords(): string;

    getLicense(): string;

    getRepository(): string;

    getDependencies(): IDataNode;
}
