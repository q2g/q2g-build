# Qlik-2-Go Builder (q2g-build)

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/48294aa49a3c4f2db610df9e2676ccfd)](https://app.codacy.com/app/konne/q2g-build?utm_source=github.com&utm_medium=referral&utm_content=q2g/q2g-build&utm_campaign=badger)

Qlik2Go Build Process which contains multiple build proceses for Webpack and Typescript, maintainly used to build and deploy qlik extensions on qlik sense.

## Usage

### Initialize new project

Create new extensions (or open existing one)

```bash
# install q2g-build globally so we could use q2g-build cli
npm i -g q2g-build

# create extension base directory
mkdir test-textension
mkdir test-extension\src
cd test-extensions

# initialize npm package to create a package.json file
npm init

# create empty tsconfig.json file which will used by q2gb
# you could also use tsc --init requires typescript installed globally
copy NUL > tsconfig.json

# create extension specific files
copy NUL > src\index.ts
copy NUL > src\index.html
copy NUL > src\index.css
```

### update tsconfig.json

> you can simply create a new tsconfig.json file with *tsc --init* also and adjust by your needs

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "umd",
    "strict": true,
    "esModuleInterop": true,
  },
  "include": ["./extension/**/*"],
  "exclude": ["node_modules"]
}
```

### Add code

extension/index.ts

```ts
import "./index.css";
import template from "./index.html";

export = {
    definition: {},
    initialProperties: {},
    template,
    support: {
        snapshot: false,
        export: false,
        exportData: false
    },
    controller: ["$scope", "$element", ($scope: any, $element) => {
    }]
};
```

extension/index.html

```html
<div class="extension-body">
    Hello Qlik to go build
</div>
```

### Use q2gb cli

You can allways create all required configuration files by your own if you want, but we will use q2gb cli which helps us to create required configuration files. It also updates the package json and add:

1. scripts
2. qext informations

```bash
C:\Users\rhannuschka\work\q2g-demo-extension>q2gb --init extension

+------------------------------------------+
| Qlik2Go - Build Cli                      |
|                                          |
| Initialize configurations for: extension |
+------------------------------------------+
        \  ^__^
         \ (oo)\_______
           (__)\       )\/\
               ||----w |
           ____||_____||__


Webpack$ entry file (relative path): ./extension/index.ts

Webpack$ out filename: q2gb-demo-extension

Webpack$ out directory (relative path): ./dist

Webpack$ enable watchmode (true|false) only development mode: true

Qext$ icon: extension

Qext$ type: visualization

Qext$ id: q2gb-demo-extension

Qext$ enable continues integration: true

+---------------------------------------+
| Success                               |
|                                       |
| created file: q2g-build.webpack.json  |
| add build scripts to package.json     |
| added qext properties to package.json |
| created file: wbfolder.wbl            |
+---------------------------------------+
        \  ^__^
         \ (oo)\_______
           (__)\       )\/\
               ||----w |
           ____||_____||__


C:\Users\rhannuschka\work\q2g-demo-extension>
```

After this we have done this we are done, to enable continues integration we have to create a configuration file manually (my bad)

q2g-ci.config.json

```bash
{
    "qrs": [
        {
            "host": "localhost"
        }
    ],
    "desktop": true
}
```

```bash
# enable watch development mode (this will also watch your files and import the extension to qlik-sense desktop)
npm run q2gb:dev
```

Special Thanks to **Lucas Schroth** from Akquinet for feedback and improving q2g-build process.

## Command line options

| Option | Required | Values | Description |
|-|-|-|-|
| --builder | true | webpack, extension, tsc | determine builder what should be created |
| --config | false | ./your-config-file.json | relative path to configuration file from project root to submit configuration data for a builder |
|--env|false| development, production | set environment, default value _development_ |
| --sourceRoot | false | ./src | relative path where to find source files. Default value _projectRoot_ |

package.json

```bash
{
    ...
    "scripts": {
        "build:tsc": "node node_modules/q2g-build --builder tsc --config ./q2g-tsc.json --sourceRoot ./src"
        "build:web": "node node_modules/q2g-build --builder webpack --config ./q2g-webpack.json"
    }
    ...
}
```

## CLI

[q2g-build:cli](docs/cli.md)

## Builders

[q2g extension builder](docs/extension.builder.md)\
[q2g typescript builder](docs/typescript.builder.md)\
[q2g webpack builder](docs/webpack.builder.md)
