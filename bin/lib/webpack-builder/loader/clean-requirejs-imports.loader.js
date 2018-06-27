"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function cleanRequireJsCssLoader(source) {
    const pattern = /("|')css\!(?:\.\/)?(.*?)(\1)/;
    const ret = source.replace(pattern, (fullMatch, quoteChar, file) => {
        return `${quoteChar}./${file}${quoteChar}`;
    });
    return ret;
}
exports.default = cleanRequireJsCssLoader;
