### Webpack

Create UMD Module Bundle.

| Option | Required | Description |
|-|-|-|
| entryFile | false | Relative path to entry file from source root for Webpack. Default value _index.ts_|
| environment | false | environment for webpack, overrides builder environment property default _development_ |
|outFileName|false| out file name default _bundle.js_ |
|outputDirectory| false | output directory where to save bundle, relative path from projectRoot |
|tsConfigFile| false | tyscript configuration file to use for webpackplugin ts-loader. default _tsconfig.json_ |
|watch| boolean | true to enable watch for development mode |

```
// q2g-web.json
{
    "entryFile": "./myProject.ts",
    "environment": "production",
    "outFileName": "myBundle.js",
    "outputDirectory": "./dist/webpack",
    "tsConfigFile": "./tsconfig.webpack.json"
    "watch": true
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
