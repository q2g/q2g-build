import { isArray } from "util";

export enum CowType {
    ERROR   = 0,
    DEFAULT = 1,
}

const cow = `
        \\  ^__^
         \\ (oo)\\_______
           (__)\\       )\\/\\
               ||----w |
           ____||_____||__

`;

const errorCow = `
        \\  ^__^
         \\ (xx)\\_______
           (__)\\       )\\/\\
               ||----w |
           ____||_____||__

`;

/**
 * what does the cow say ?
 *
 * @export
 * @param {(string | string[])} message
 */
export function cowSay(message: string | string[], type: CowType = CowType.DEFAULT) {

    if (!isArray(message)) {
        message = [...message.split(/\n/)];
    }

    const maxLength = message.reduce((prev: number, current: string): number => {
        return Math.max(prev, current.length);
    }, 0);

    const messageLines = message.map((line): string => {
        const lineLength = line.length;
        /** write line and fill up with white spaces */
        return `| ${line}${" ".repeat(maxLength - lineLength)} |`;
    });

    const messageBox = `
+-${"-".repeat(maxLength)}-+
${messageLines.join("\n")}
+-${"-".repeat(maxLength)}-+`;

    process.stdout.write(messageBox);

    switch (type) {
        case CowType.ERROR:
            process.stdout.write(errorCow);
            break;
        default:
            process.stdout.write(cow);
    }
}
