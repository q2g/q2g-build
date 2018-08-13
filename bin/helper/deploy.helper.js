"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const nodeCopy = require("ncp");
const path_1 = require("path");
class DeployHelper {
    static removeDirectory(dir) {
        if (!fs_1.existsSync(dir)) {
            return;
        }
        const files = fs_1.readdirSync(dir);
        if (files.length > 0) {
            files.forEach((file) => {
                const filePath = path_1.resolve(dir, file);
                const fileStat = fs_1.statSync(filePath);
                if (fileStat.isDirectory()) {
                    DeployHelper.removeDirectory(filePath);
                }
                else {
                    fs_1.unlinkSync(filePath);
                }
            });
        }
        fs_1.rmdirSync(dir);
    }
    static copyFiles(sourceDir, targetDir, filterPattern) {
        const sourceDirectory = sourceDir;
        const targetDirectory = targetDir;
        const filter = filterPattern;
        const options = {
            filter: (source) => {
                if (filter && source.match(filter)) {
                    return false;
                }
                return true;
            },
        };
        return new Promise((success) => {
            nodeCopy(sourceDirectory, targetDirectory, options, () => {
                success("done");
            });
        });
    }
    static createNcpExcludeRegExp(excludes) {
        const excludeNcpPattern = excludes.reduce((pattern, exclude) => {
            let sanitizedPattern = exclude
                .replace(/(\.|\/|\\)/g, "\\$1")
                .replace(/(\*)\*?/g, ".\$1?");
            if (exclude.match(/\.[a-z]{1,}$/i)) {
                sanitizedPattern = sanitizedPattern.concat("$");
            }
            return pattern.concat("|", sanitizedPattern);
        }, "node_modules");
        return new RegExp(excludeNcpPattern);
    }
}
exports.DeployHelper = DeployHelper;
