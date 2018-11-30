/**
 * simple loader to remove requirejs imports like css!file.css or text!file.txt with
 * ./file.css or ./file.txt since webpack dont understand that
 *
 * @package q2g-builder
 * @author Ralf Hannuschka
 */
export default function cleanRequireJsCssLoader(source) {

    // pattern to replace css!content.css | css!./content.css with ./content.css
    const patternCss = /("|')css\!(?:\.\/)?(.*?)\.css(\1)/;

    /**
     * loop through all matches and replace them
     */
    const ret = source.replace(patternCss, (fullMatch, quoteChar, file) => {
        return `${quoteChar}./${file}.less${quoteChar}`;
    });

    return ret;
}
