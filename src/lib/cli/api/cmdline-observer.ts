export interface ICommandLineResult {
    namespace: string;

    property: ICommandLineProperty;
}

export interface ICommandLineReaderObserver {
    readCommandlineArgument(argument: ICommandLineResult): void;
}

export interface ICommandLineProperty {

    text: string;

    validator?: (value: string) => boolean;

    value?: string;
}

export interface ICommandLineData {

    namespace: string;

    data: ICommandLineProperty[];
}

export interface IBuilderProperty extends ICommandLineProperty {
    name: string;
}

export interface ICommandLineBuilderData extends ICommandLineData {

    data: IBuilderProperty[];
}
