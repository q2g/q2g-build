import { existsSync, lstatSync, PathLike, readFileSync } from "fs";
import { basename, extname, resolve } from "path";

/**
 * get image source data as bas64 format
 */
function getSourceData(path: PathLike): string {
    const base64Source = Buffer.from(readFileSync(path)).toString("base64");
    const imageType    = extname(basename(path.toString())).toLowerCase();

    switch (imageType.substr(1)) {
        case "jpg": case "jpeg":
            return `data:image/jpg;base64,${base64Source}`;

        case "gif":
            return `data:image/gif;base64,${base64Source}`;

        case "svg":
            return `data:image/svg+xml;base64,${base64Source}`;

        default:
            return `data:image/png;base64,${base64Source}`;
    }
}

/**
 * find all matches from html loader,
 * which one replace an image path with require("..../file");
 *
 * and replace by base64 data source
 */
export default function imageToBase64Loader(source) {

    /**
     * get all require imports from <img src=\"" + require("./assets/path/image") + "\" ...>
     * and extract only image path from it which will converted into base 64 and replace
     * full match by
     *
     * <img src=\"base64SourceString\" ...>
     */
    const requiredModules = /<img src=\\"(?:".*?require\(")([^"]+)(?:".*?(?=\\"\s))/g;
    const replacedSource = source.replace(requiredModules, (match, relativePath) => {
        const imagePath = resolve(this.context, relativePath);
        if (existsSync(imagePath) && lstatSync(imagePath).isFile) {
            return `<img src=\\"${getSourceData(imagePath)}`;
        }
        return match;
    });
    return replacedSource;
}
