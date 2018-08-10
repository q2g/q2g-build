export enum QEXT_PROPERTIES {
    AUTHOR = "author",
    DEPENDENCIES = "dependencies",
    DESCRIPTION = "description",
    HOMEPAGE = "homepage",
    ICON = "icon",
    KEYWORDS = "keywords",
    LICENSE = "license",
    NAME = "name",
    PREVIEW = "preview",
    REPOSITORY = "repository",
    TYPE = "type",
    VERSION = "version",
}

export const MANDATORY_PROPERTIES = [
    QEXT_PROPERTIES.AUTHOR,
    QEXT_PROPERTIES.DESCRIPTION,
    QEXT_PROPERTIES.ICON,
    QEXT_PROPERTIES.NAME,
    QEXT_PROPERTIES.TYPE,
    QEXT_PROPERTIES.VERSION,
];
