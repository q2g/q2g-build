### Q2G-Extension Builder

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