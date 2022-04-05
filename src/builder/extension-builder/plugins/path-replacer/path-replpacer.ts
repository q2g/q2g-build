import { stat } from "fs";
import { join } from "path";
import { Compiler, Compilation } from "webpack";


// Check if this is a windows runtime or not
const WIN = /^win/.test(process.platform);

// Captures component id (e.g 'feedback_form' from 'feedback/feedback_form').
const COMPONENT_ID_PATTERN = WIN ? /([^\\]+)$/ : /[^\/]*$/

export class PathReplacer {

    pathRegExp;
    pathReplacement;
    exts;
    info = [];
    
    public constructor(pathRegExp: RegExp, pathReplacement: string, exts?) {
        this.pathRegExp  = pathRegExp;
        this.pathReplacement = pathReplacement;
        this.exts = exts || ['jsx', 'js', 'scss', 'css']
        console.log("PathReplacer - Construckor")
    }


    public apply(compiler: Compiler) {
        console.log("PathReplacer - apply")
        compiler.hooks.normalModuleFactory.tap("PathReplacer", (nmf) => {
            nmf.hooks.beforeResolve.tapAsync("PathReplacer2", (
                comp, // ToDo rebuild to Compilation Type
                callback,
            ) => {
                console.log("PathReplacer - make")
    
                console.log("## 1 ##")
                if(!comp) return callback();
    
                console.log("pathRegExp", this.pathRegExp)
                console.log("pathReplacement", this.pathReplacement)
                // console.log("exts", this.exts)
                console.log("test 1 ", this.pathRegExp.test(comp.request))
                console.log("test 2 ", comp.request)
                console.log("test 3 ", comp)
    
                // test the request for a path match
                if(this.pathRegExp.test(comp.request)) {
                    console.log("## 2 ##")
                    var filePath = comp.request.replace(this.pathRegExp, this.pathReplacement);
                    this.getResolvedFile(filePath, this.exts, (file) => {
                        if (typeof file === 'string') {
                            this.info.push('[path-override] '+comp.request+' => '+file);
                            comp.request = file;
                        }
                        return callback();
                    })
                } else {
                    return callback(false, false);
                }
                
                callback();
            })

        })

        compiler.hooks.done.tapAsync("done", () => {
            console.log("PathReplacer - done")
            if (this.info.length > 0) {
                console.log(this.info.join("\n"));
            }
        });

    }

    private getResolvedFile(filePath, exts, callback) {
        console.log("PathReplacer - getResolvedFile")

        var enclosingDirPath = filePath || '';
        var captured = enclosingDirPath.match(COMPONENT_ID_PATTERN);
        if (captured) {
            var componentId = captured[1];
            var extObjs = exts.reduce(function(allExts, ext) {
                allExts.push(
                    { ext: ext, file: true },
                    { ext: ext, file: false }
                )
                return allExts
            }, [])

            var tryToFindExtension = function (index) {
                var extObj = extObjs[index];
                // None of passed extensions are found
                if (!extObj) {
                    return callback(false);
                }
                var componentFileName, componentFilePath;
                // Try to load regular file
                if (extObj.file) {
                    componentFilePath = enclosingDirPath;
                    let extension = '.' + extObj.ext;
                    if (componentFilePath.slice(extension.length * -1) !== extension) {
                        componentFilePath += extension;
                    }
                } else {
                    componentFileName = componentId + '.' + extObj.ext;
                    componentFilePath = join(enclosingDirPath, componentFileName);
                }
                stat(componentFilePath, function (err, stats) {
                    if (err || !stats.isFile()) {
                        return tryToFindExtension(index + 1);
                    }
                    callback(componentFilePath)
                });
            };
            tryToFindExtension(0);
        }
    }

}


