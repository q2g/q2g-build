# Qlik-2-Go Builder (q2g-build)

- projectRoot: absolute path to the project, this is the path where we start the build process ( package.json ).
- sourceRoot: relative path from project root where to find all source files default _projectRoot_

## Command line options

| Option | Required | Values | Description |
|-|-|-|-|
| --builder | true | webpack, extension, tsc | determine builder what should be created |
| --config | false | ./your-config-file.json | relative path to configuration file from project root to submit configuration data for a builder |
|--env|false| development, production | set environment, default value _development_ |
| --sourceRoot | false | ./src | relative path where to find source files. Default value _projectRoot_ |

```
package.json
{
    ...
    "scripts": {
        "build:tsc": node node_modules/q2g-build --builder tsc --config ./q2g-tsc.json --sourceRoot ./src
        "build:web": node node_modules/q2g-build --builder webpack --config ./q2g-webpack.json 
    }
    ...
}
```

## Builders

### Webpack

Create UMD Module Bundle.

| Option | Required | Description |
|-|-|-|
| entryFile | false | Relative path to entry file from source root for Webpack. Default value _index.ts_|
| environment | false | environment for webpack, overrides builder environment property default _development_ |
|outFileName|false| out file name default _bundle.js_ |
|outputDirectory| false | output directory where to save bundle, relative path from projectSource |
|tsConfigFile| false | tyscript configuration file to use for webpackplugin ts-loader. default _tsconfig.json_ |

```
// q2g-web.json
{
    "entryFile": "./myProject.ts",
    "environment": "production",
    "outFileName": "myBundle.js",
    "outputDirectory": "./dist/webpack",
    "tsConfigFile": "./tsconfig.webpack.json"
}
```

```
// tsconfig.webpack.json
{
    "compilerOptions": {
        "target": "es5",
        "lib": [
            "dom",
            "es2015"
        ],
        "noResolve": false
    },
    "include": [
        "./**/*.ts",
        "typings/*.d.ts"
    ],
    "exclude": [
        "node_modules",
        "dist",
        "test"
    ]
}
```

:warning: if _module_ configuration to tsconfig is added AND or UMD will not work correctly.

### Q2G-Extension

Extends Webpack Builder, copy additional q2g-extension files, like q2g-ext-{EXTENSION_NAME}.qext, wbfolder.wbl. And create a zip file into dist folder.

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
