#!/usr/bin/env node
import { cowSay, CowType, initCommand} from "./commands";

const [, , ...args] = process.argv;

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
        initCommand(args[1]);
        break;
    default:
        cowSay(`Unknown command: ${args[0].replace(/^-*/, "")}`, CowType.ERROR);
        process.exit(1);
}
