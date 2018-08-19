import * as WebpackCopyPlugin from "copy-webpack-plugin";
import * as WebpackPathOverridePlugin from "path-override-webpack-plugin";
import * as WebpackZipPlugin from "zip-webpack-plugin";

export const CopyWebpackPlugin  = WebpackCopyPlugin;
export const PathOverridePlugin = WebpackPathOverridePlugin;
export const ZipWebpackPlugin   = WebpackZipPlugin;
export * from "./qext/qext-file.plugin";
