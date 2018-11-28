import * as ReadLine from "readline";
import {
    ICommandLineArgument,
    ICommandLineData,
    ICommandLineProperty,
    ICommandLineReaderObserver,
} from "../api/cmdline-observer";
import { ICommandLineReaderObservable } from "../api/observable";

export  class CommandlineReader implements ICommandLineReaderObservable {

    /**
     * line reader
     *
     * @private
     * @memberof CommandlineReader
     */
    private lineReader: ReadLine.Interface;

    /**
     *
     *
     * @private
     * @type {Set<ICommandLineReaderObserver>}
     * @memberof CommandlineReaderService
     */
    private observer: Set<ICommandLineReaderObserver>;

    /**
     * Creates an instance of CommandlineReader.
     * @memberof CommandlineReader
     */
    public constructor() {

        this.lineReader = ReadLine.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        this.observer = new Set();
    }

    /**
     *
     *
     * @param {ICommandLineData[]} data
     * @memberof CommandlineReader
     */
    public async read(data: ICommandLineData[]) {

        // read data from command line
        await this.readSection(data);
        this.lineReader.close();
    }

    /**
     *
     *
     * @param {CommandlineReaderObserver} sub
     * @returns
     * @memberof CommandlineReaderServic
     */
    public subscribe(sub: ICommandLineReaderObserver) {

        this.observer.add(sub);

        // return unsubscribe method
        return {
            unsubscribe: () => {
                this.observer.delete(sub);
            },
        };
    }

    /**
     * publish data
     *
     * @param {any} data
     */
    private notifyObserver(data: string, ns: string) {

        const a: ICommandLineArgument = {data, namespace: ns};

        if ( this.observer.size > 0 ) {
            this.observer.forEach((observer) => {
                observer.readCommandlineArgument(a);
            });
        }
    }

    /**
     * loop through all sections
     *
     * @private
     * @param {ICommandLineData[]} data
     * @returns
     * @memberof CommandlineReader
     */
    private async readSection(data: ICommandLineData[]) {
        return new Promise<void>(async (resolve) => {
            const allData = data.slice();
            const current = allData.shift();

            await this.readCommandLineData(current.data, current.namespace);

            if (!allData.length) {
                /** close line reader now */
                this.lineReader.close();
                resolve();
            } else {
                this.readSection(allData)
                    .then(() => resolve());
            }
        });
    }

    /**
     * loops through all properties and loop through
     *
     * @private
     * @param {ICommandLineProperty[]} data
     * @param {string} ns
     * @returns {Promise<void>}
     * @memberof CommandlineReader
     */
    private async readCommandLineData(data: ICommandLineProperty[], ns: string): Promise<void> {

        return new Promise<void>(async (resolve) => {
            const allData = data.slice();
            const current = allData.shift();

            const answer = await this.readFromCommandLine(current);
            this.notifyObserver(answer, ns);

            if (!allData.length) {
                resolve();
            } else {
                this.readCommandLineData(allData, ns)
                    .then(() => resolve());
            }
        });
    }

    /**
     * read data from command line
     *
     * @private
     * @param {ICommandLineProperty} data
     * @returns {Promise<string>}
     * @memberof CommandlineReader
     */
    private readFromCommandLine(data: ICommandLineProperty): Promise<string> {

        return new Promise<string>((resolve, reject) => {
            this.lineReader.question(data.text, (answer) => {
                resolve(answer);
            });
        });
    }
}
