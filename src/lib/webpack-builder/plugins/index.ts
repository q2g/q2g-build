import * as PluginClean from "clean-webpack-plugin";
import * as CopyPlugin from "copy-webpack-plugin";
import * as ZipPlugin from "zip-webpack-plugin";

export const CleanWebpackPlugin = PluginClean;
export const ZipWebpackPlugin   = ZipPlugin;
export const CopyWebpackPlugin  = CopyPlugin;

export * from "./log.plugin";
