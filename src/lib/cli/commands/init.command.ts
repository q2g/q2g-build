import { Extension } from "../service/extension";

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
            // initialize InitWebpackService
            break;
        default:
            process.stderr.write("invalid argument for init, call with --init <extension|webpack>");
            process.exit(1);
    }

    return initService.run();
}
