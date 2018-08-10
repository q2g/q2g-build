import { IDataNode } from "../../../api/data-node";

export interface IQextData {

    author: string;

    description: string;

    icon: string;

    name: string;

    type: string;

    version: string;

    preview?: string;

    homepage?: string;

    keywords?: string;

    license?: string;

    repository?: string;

    dependencies?: IDataNode;
}
