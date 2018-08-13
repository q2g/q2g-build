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

[q2g webpack builder](docs/webpack.builder.md) \
[q2g extension builder](docs/extension.builder.md) \
[q2g typescript builder](docs/typescript.builder.md)
