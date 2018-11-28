#!/usr/bin/env node

import { Extension } from "./service/extension";

const [, , ...args] = process.argv;

const enum InitArgs {
    EXTENSION = "extension",
    WEBPACK   = "webpack",
}

const enum Commands {
    INIT = "--init",
}

if (args.length === 0) {
    process.stdout.write(`--init <extension|webpack> initializes new build`);
    process.exit(0);
}

/** read command line arguments first should be the command which will be called */
switch (args[0]) {
    case Commands.INIT:
        handleInitCommand(args[1] as InitArgs);
        break;
    default:
        process.stderr.write(`Unknown command: ${args[0].replace(/^-*/, "")}`);
        process.exit(1);
}

/**
 * handle init command to initialize a new build process
 *
 * @param {InitArgs} name
 */
function handleInitCommand(name: InitArgs) {

    let initService;

    switch (name) {
        case InitArgs.EXTENSION:
            // initialize InitExtensionService
            initService = new Extension();
            break;
        case InitArgs.WEBPACK:
            // initialize InitWebpackService
            break;
        default:
            process.stderr.write("invalid argument for init, call with --init <extension|webpack>");
            process.exit(1);
    }

    return initService.run();
}
