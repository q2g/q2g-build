# Qlik-2-Go Builder (q2g-build)

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/48294aa49a3c4f2db610df9e2676ccfd)](https://app.codacy.com/app/konne/q2g-build?utm_source=github.com&utm_medium=referral&utm_content=q2g/q2g-build&utm_campaign=badger)

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
|outputDirectory| false | output directory where to save bundle, relative path from projectRoot |
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

### QEXT File Builder

Generate <EXTENSION-NAME>.qext file by parsing the package.json file, this will only happens for q2g-extension builder. 

Add extension informations will defined in package.json under qext 
```
// package.json 
{
    author: "q2g team",
    ...
    qext: {
        author: "q2g extension team",
        dependencies: {
            "qlik-sense": ">=3.2.x"
        },
        description: "q2g demo extension",
        name: "q2gDemoExtension",
        homepage: "",
        icon: "filterpane",
        keywords: "qlik-sense, viszualization",
        license: "MIT",
        repository: "https://github.com/q2g/q2g-demo-extension",
        preview: "preview.png",
        type: "visualization",
        version: "1.0.0",
    }
}
```

You could define all properties for qext file in the qext part from package.json, but some properties
got a fallback and will taken directly from package.json if not defined in qext section.

Required Properties needs to get defined and have an value, otherwise extension files will not created anymore.

Configuration Values read from package.json

| Name | Mandatory | type | description | has fallback |
|-|-|-|-|-|
| author | :white_check_mark: | string | author of the extension | :white_check_mark: |
| description | :white_check_mark: | string | description of the extension | :white_check_mark: |
| name | :white_check_mark: | string | name of the extension | :white_check_mark: |
| icon | :white_check_mark: | string | | - |
| type | :white_check_mark: | string | | - |
| version | :white_check_mark: | string | version number of the extension like 1.0.0 | :white_check_mark: |
| preview | - | string | preview image filename | - |
| license | - | string | license for the extension | :white_check_mark: |
| repository | - | string | repository | :white_check_mark: |
| keywords | - | string | | :white_check_mark: |
| homepage | - | string | | :white_check_mark: |
| dependencies | - | object | dependencies for extension | - |

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

### Publish new Package on NPM / Git Hub

```
// run command line argument to publish a new package
npm run pkg:publish [<VERSION>]
```

Versions
- **patch | fix** create new patch for package, like 1.0.1 -> 1.0.2
- **minor | add** update minor version for package, 1.0.1 -> 1.1.0
- **major | break** update major version for package, 1.0.1 -> 2.0.0
