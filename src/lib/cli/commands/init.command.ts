import { Extension } from "../service/extension";
import { Webpack } from "../service/webpack";
import { cowSay, CowType } from "./cow-say.command";

const enum InitType {
    EXTENSION = "extension",
    WEBPACK   = "webpack",
}

export function initCommand(type: string) {

    let initService;

    switch (type) {
        case InitType.EXTENSION:
            // initialize InitExtensionService
            initService = new Extension();
            break;
        case InitType.WEBPACK:
            initService = new Webpack();
            break;
        default:
            cowSay("invalid argument for init\ncall with --init <extension|webpack>", CowType.ERROR);
            process.exit(1);
    }

    cowSay([
        `Qlik2Go - Build Cli`,
        ` `,
        `Initialize configurations for: ${type}`,
    ]);
    return initService.run();
}
