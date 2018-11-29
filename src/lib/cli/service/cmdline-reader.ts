import * as ReadLine from "readline";
import {
    ICommandLineData,
    ICommandLineProperty,
    ICommandLineReaderObserver,
    ICommandLineResult,
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
        await this.readData(data);
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
     * publish data to observer if user give an answer
     *
     * @param {any} data
     */
    private notifyObserver(
        property: ICommandLineProperty,
        namespace: string,
    ) {
        const a: ICommandLineResult = {property, namespace};

        if ( this.observer.size > 0 ) {
            this.observer.forEach((observer) => {
                observer.readCommandlineArgument(a);
            });
        }
    }

    /**
     * read all required propertys from sections
     * and notify observer. If an answer not validate
     * repeat the question
     *
     * @private
     * @param {ICommandLineData[]} data
     * @returns {Promise<void>}
     * @memberof CommandlineReader
     */
    private readData(data: ICommandLineData[]): Promise<void> {

        return new Promise((resolve) => {

            const sections = [...data];

            let currentSection = sections.shift();
            let sectionData    = [...currentSection.data];
            let property       = sectionData.shift();

            this.lineReader.setPrompt("q2g-build$ ");

            /** write first question */
            this.lineReader.question(`${property.text}: `, (answer: string) => {
                property.value = answer.trim();
                this.lineReader.emit("line");
            });

            this.lineReader.on("line", (line: string) => {
                /** if answer validate pull next property from section.property queue */
                if ( this.validateProperty(property.value, property) ) {
                    this.notifyObserver(property, currentSection.namespace);

                    /** no questions and no other sections we are done */
                    if (!sectionData.length && !sections.length) {
                        this.lineReader.close();
                        resolve();
                        return;
                    }

                    /** no questions available anymore but we have an other section */
                    if (!sectionData.length) {
                        currentSection = sections.shift();
                        sectionData    = [...currentSection.data];
                    }

                    /** pull next property */
                    property = sectionData.shift();
                }

                this.lineReader.question(`${property.text}: `, (answer: string) => {
                    property.value = answer.trim();
                    this.lineReader.emit("line");
                });
            });
        });
    }

    /**
     * validate a property if a validator is given
     *
     * @private
     * @param {string} answer
     * @param {ICommandLineProperty} property
     * @returns {boolean}
     * @memberof CommandlineReader
     */
    private validateProperty(answer: string, property: ICommandLineProperty): boolean {
        if (!property.hasOwnProperty("validator") || typeof property.validator !== "function") {
            return true;
        }
        return property.validator(answer);
    }
}
