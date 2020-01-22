import { IBuilder, IBuilderEnvironment, IOptionResult } from "../../api";
import { IDataNode } from "../../api/data-node";
import { IQextData } from "./api";
import { QextConfigurationException } from "./data/exception/qext-config.exception";
import { QextConfigService } from "./services/qext-config.service";
import { QextFileService } from "./services/qext-file.service";
import { existsSync } from "fs";

export class QextFileBuilder implements IBuilder {

    private model: IQextData;

    private configService: QextConfigService;

    private fileService: QextFileService;

    private initConfig: IDataNode;

    constructor() {
        this.configService = QextConfigService.getInstance();
        this.fileService   = new QextFileService();
    }

    public initialize(baseConfig: IBuilderEnvironment) {

        this.initConfig = {
            projectRoot: baseConfig.projectRoot,
        };
    }

    public configure(config: IDataNode): void {

        const configuration = {
            ...this.initConfig,
            ...config,
        };

        const results = this.configService.setOptions(configuration);
        const errors  = {};

        let hasError: boolean = false;

        results.forEach( (result) => {
            if ( result.errors.length ) {
                hasError = true;
                errors[result.name] = result.errors;
            }
        });

        if ( hasError ) {
            throw new QextConfigurationException(JSON.stringify(errors));
        }
    }

    public run(): Promise<string> {

        return new Promise( (resolve, reject) => {
            try {
                const file = this.fileService.createFile();
                resolve(file);
            } catch (error) {
                reject(error.message);
            }
        });
    }
}
