/**
 * simple loader to remove requirejs imports like css!file.css or text!file.txt with
 * ./file.css or ./file.txt since webpack dont understand that
 *
 * @package q2g-builder
 * @author Ralf Hannuschka
 */
export default function cleanRequireJsCssLoader(source) {

    // pattern to replace text! or css! requirejs plugins with ./content.filetype
    // const pattern = /("|')(?:text|css)\!(?:\.\/)?(.*?)(\1)/;

    // pattern to replace css!content.css | css!./content.css with ./content.css
    const pattern = /("|')css\!(?:\.\/)?(.*?)(\1)/;

    /**
     * loop through all matches and replace them
     */
    const ret = source.replace(pattern, (fullMatch, quoteChar, file) => {
        return `${quoteChar}./${file}${quoteChar}`;
    });
    return ret;
}
