import { ICommandLineBuilderData, ICommandLineReaderObserver, ICommandLineResult } from "../api/cmdline-observer";
import { CommandlineReader } from "./cmdline-reader";

export class Webpack implements ICommandLineReaderObserver {

    private reader: CommandlineReader;

    public constructor() {
        this.reader = new CommandlineReader();
        this.reader.subscribe(this);
    }

    /**
     * start the reader and build files we need
     *
     * @returns {Promise<void>}
     * @memberof Webpack
     */
    public async run(): Promise<void> {
        await this.reader.read(this.commandLineData);
    }

    /**
     *
     *
     * @param {ICommandLineArgument} data
     * @memberof Webpack
     */
    public readCommandlineArgument(result: ICommandLineResult) {
        // not empty
    }

    /**
     * get command line data with questions to fullfill data
     *
     * @readonly
     * @protected
     * @type {ICommandLineData[]}
     * @memberof Webpack
     */
    protected get commandLineData(): ICommandLineBuilderData[] {
        return [{
            data: [{
                name: "foobar",
                text: "was ist dein Lieblings Haustier",
                value: "Katze",
            }],
            namespace: "webpack",
        }];
    }
}
