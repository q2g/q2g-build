import { ICommandLineReaderObserver } from "./cmdline-observer";

export interface ICommandLineReaderObservable {

    subscribe(observer: ICommandLineReaderObserver);
}
