import { isArray } from "util";

/**
 * what does the cow say ?
 *
 * @export
 * @param {(string | string[])} message
 */
export function cowSay(message: string | string[]) {

    const cow = `
           \\  ^__^
            \\ (oo)\\_______
              (__)\\       )\\/\\
                  ||----w |
              ____||_____||__

    `;

    if (!isArray(message)) {
        message = [...message.split(/(\r|\n)/)];
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
    process.stdout.write(cow);
}
