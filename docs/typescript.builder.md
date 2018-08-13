### TSC

Run typescript compiler from q2g-build to compile all typescript files to esm modules and copy binary files to dist directory. If u need a UMD Module use the webpack builder.

| Option | Required | Description |
|-|-|-|
|excludeNcp|false| exclude files or paths for [ncp](https://www.npmjs.com/package/ncp). string[] patterns. By Default _node_modules_, _.ts_ and _.d.ts_ files will be excluded. All files which are not excluded will copied from projectSource to dist directory|
|tsConfigFile|false| relative path to tsconfig file from projectRoot |
|outputDirectory|false| relative path from project root where to deploy compiled and binary files. By Default outDir from given _tsConfigFile_ compilerOptions.outDir is taken |

```
// q2g-build.tsc.json
{
    "excludeNcp": [ ".js", ".json", "dist"], // don't copy any js, json files and nothing from dist directory
    "tsConfigFile": "./tsconfig.q2g-tsc.json"
}
```