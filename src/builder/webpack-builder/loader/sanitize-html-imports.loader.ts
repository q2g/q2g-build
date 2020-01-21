/**
 * sanitize html imports
 *
 * convert: import * as template from "text!./my.file.html"
 * into: import template from "my.file.html"
 *
 * @package q2g-builder
 * @author Ralf Hannuschka
 */
export default function sanitizeHtmlImportsLoader(source) {

    const importPattern = /import (?:\* as\s)?([^\s]+).*?("|')(?:text!)?(.*\.html)\2/;

    /** loop through all matches and replace them */
    const ret = source.replace(importPattern, (fullMatch, name, quoteChar, path) => {
        return `import ${name} from ${quoteChar}${path}${quoteChar}`;
    });

    return ret;
}
