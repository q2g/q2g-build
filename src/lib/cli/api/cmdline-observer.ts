export interface ICommandLineArgument {
    namespace: string;

    // data: ICommandLineProperty;

    data: string;
}

export interface ICommandLineReaderObserver {
    readCommandlineArgument(argument: ICommandLineArgument): void;
}

export interface ICommandLineProperty {

    text: string;

    validator?: (value: string) => boolean;

    value?: string;

    [key: string]: any;
}

export interface ICommandLineData {

    namespace: string;

    data: ICommandLineProperty[];
}
