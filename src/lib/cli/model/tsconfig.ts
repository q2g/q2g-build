export const TS_CONFIG = {
    compilerOptions: {
        module: "commonjs",
        moduleResolution: "node",
    },
    extends: "./tsconfig",
};

export const CI_CONFIG = {
    desktop: true,
    qrs: [{
            host: "localhost",
    }],
};

export const TS_CONFIG_FILE_NAME = "q2g-build.tsconfig.json";
export const CI_CONFIG_FILE_NAME = "q2g-ci.config.json";
