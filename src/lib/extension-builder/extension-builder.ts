import { WebpackBuilder } from "../webpack-builder";
import { WebpackConfigModel } from "../webpack-builder/model";

/**
 * Builder for Qlick 2 Go Extensions
 *
 * @export
 * @class ExtensionBuilder
 * @extends {WebpackBuilder}
 */
export class ExtensionBuilder extends WebpackBuilder {

    public constructor() {
        super();
    }

    /**
     * create default configuration for Extension Builder
     *
     * @protected
     * @memberof ExtensionBuilder
     */
    protected createDefaultConfiguration(): WebpackConfigModel {
        const configModel = super.createDefaultConfiguration();
        return configModel;
    }
}
