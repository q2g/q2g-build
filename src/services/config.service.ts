import { IDataNode } from "rh-utils";
import { IOptionRule, IOptionRuleSet } from "../api";
import { BuilderConfigRules } from "../data/builder-config.rules";

export abstract class ConfigService<T> {

    protected configModel: T;

    private configOptions: IOptionRuleSet;

    constructor() {
        this.configModel   = this.getConfigModel();
        this.configOptions = {
            ...BuilderConfigRules,
            ...this.getConfigRules(),
        };
    }

    /**
     * add multiple options
     *
     * @param {IDataNode} options
     * @memberof BuilderService
     */
    public setOptions(options: IDataNode, validate = true) {

        let cleanedOptions = options;
        let errors = [];

        if ( validate ) {
            cleanedOptions = this.cleanOptions(options);
            errors = this.validateOptions(cleanedOptions);
        }

        if ( ! errors.length ) {
            Object.keys(cleanedOptions).forEach( (optionName) => {
                this.setOption(optionName, cleanedOptions[optionName]);
            });
        }
    }

    public getConfig(): T {
        return this.configModel;
    }

    protected abstract getConfigRules(): IOptionRuleSet;

    protected abstract getConfigModel(): T;

    /**
     * remove all options from source which are not defined in option ruleset
     *
     * @static
     * @param {IDataNode} source
     * @param {IOption} target
     * @returns {IDataNode}
     * @memberof OptionHelper
     */
    private cleanOptions( source: IDataNode): IDataNode {
        const filtered: IDataNode = Object.assign({}, source);
        const validOptions = this.configOptions;

        Object.keys(source).forEach( (option) => {
            if ( ! validOptions[option] ) {
                delete filtered[option];
            }
        });
        return filtered;
    }

    /**
     * set new option to configuration model
     *
     * @private
     * @param {string} option
     * @param {*} value
     * @memberof BuilderService
     */
    private setOption(option: string, value: any) {

        // write configuration data to model
        const setterMethod = `set${option.charAt(0).toUpperCase()}${option.slice(1)}`;
        const methodExists = Object.prototype.toString.call(
            this.configModel[setterMethod]).slice(8, -1) === "Function";

        if ( methodExists ) {
            this.configModel[setterMethod](value);
        }
    }

    /**
     * loop all options from target (accepeted options) and return string array
     * with all errors
     *
     * @static
     * @param {IDataNode} source
     * @param {IOption} target
     * @returns {string[]}
     * @memberof OptionHelper
     */
    private validateOptions( source: IDataNode): string[] {

        const errors: string[] = [];
        const options: IOptionRuleSet = this.configOptions;

        Object.keys(options).forEach( (optionName) => {
            const rule: IOptionRule      = options[optionName];
            const optionValue: IDataNode = source[optionName];

            if ( rule.required ) {
                this.validateRequiredOption(rule, optionValue);
                return;
            }

            this.validateOption(rule, optionValue);
        });

        return errors;
    }

    /**
     * validate a required option need an value
     *
     * @private
     * @param {IOptionRule} rule
     * @param {*} optionValue
     * @returns
     * @memberof ConfigService
     */
    private validateRequiredOption(rule: IOptionRule, optionValue: any) {
        if ( ! optionValue )  {
            return false;
        }
        this.validateOption(rule, optionValue);
    }

    /**
     * valuedate option value
     *
     * @private
     * @param {IOptionRule} rule
     * @param {*} value
     * @returns
     * @memberof ConfigService
     */
    private validateOption(rule: IOptionRule, value: any) {
        // better check for undefined
        if ( ! value ) {
            return true;
        }
        // check against validator function
        return rule.validatorFn(value);
    }
}
