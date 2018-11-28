import { ICommandLineArgument, ICommandLineData } from "../api/cmdline-observer";
import {Webpack} from "./webpack";

// tslint:disable-next-line:max-classes-per-file
export class Extension extends Webpack {

    public async run(): Promise<void> {
        /** call parent */
        await super.run();
        console.log("nun bin ich fertig hier");
    }

    public readCommandlineArgument(arg: ICommandLineArgument) {

        if (arg.namespace !== "extension") {
            super.readCommandlineArgument(arg);
            return;
        }

        console.log(arg);
    }

    protected get commandLineData(): ICommandLineData[] {

        return [
            ...super.commandLineData,
            {
                data: [
                    {
                        cId: "icon",
                        text: "Wir suchen das Super Icon: ",
                        validator: (value) => {
                            return true;
                        },
                        value: "",
                    },
                    {
                        cId: "type",
                        text: "Der Type ist entscheidend: ",
                        validator: (value) => {
                            return true;
                        },
                        value: "",
                    },
                ],
                namespace: "extension",
            },
        ];
    }
}
