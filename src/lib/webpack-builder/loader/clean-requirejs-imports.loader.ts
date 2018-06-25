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

    // pattern to replace css! requirejs plugins with ./content.css
    const pattern = /("|')css\!(?:\.\/)?(.*?)(\1)/;
    const ret = source.replace(pattern, () => {
        return `${RegExp.$1}./${RegExp.$2}${RegExp.$1}`;
    });
    return ret;
}
