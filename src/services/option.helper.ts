import { existsSync, readFileSync } from "fs";
import { IDataNode } from "rh-utils";
import { IOption } from "../api";

/**
 * Helper service to convert, filter, load or validate options
 *
 * @export
 * @class OptionHelper
 */
export class OptionHelper {

    /**
     * convert command line arguments into DataNode
     *
     * @static
     * @param {string[]} args
     * @returns {IDataNode}
     * @memberof OptionHelper
     */
    public static convertCommandlineArguments(args: string[]): IDataNode {
        const options: IDataNode = {};
        for (let i = 0, ln = args.length; i < ln; i++) {
            const option: string = args[i].slice(2);
            options[option] = args[++i];
        }

        return options;
    }

    /**
     * remove all options from source which are not defined in target
     *
     * @static
     * @param {IDataNode} source
     * @param {IOption} target
     * @returns {IDataNode}
     * @memberof OptionHelper
     */
    public static cleanOptions( source: IDataNode, target: IOption): IDataNode {
        const filtered: IDataNode = Object.assign({}, source);
        for ( const option in source ) {
            if ( ! target.hasOwnProperty(option) ) {
                delete filtered[option];
            }
        }
        return filtered;
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
    public static validateOptions( source: IDataNode, target: IOption): string[] {

        let errors: string[] = [];

        for (const property in target) {

            if ( ! target.hasOwnProperty(property) ) {
                continue;
            }

            const option    = target[property];
            const optionSet = source.hasOwnProperty(property);
            const value     = (source[property] || "").toString();

            if ( option.required && ! optionSet) {
                errors.push(`option: ${property} is required\ncall with --${property} [${option.values.join("| ")}]`);
                continue;
            }

            if ( optionSet ) {

                if (option.hasOwnProperty("validator") ) {
                    const isInvalid = ! value.match(option.validator.test);
                    errors = errors.concat( isInvalid ? [option.validator.errorMsg] : []);
                } else {
                    const isInvalid = option.values.indexOf(value) === -1;
                    errors = errors.concat( isInvalid
                        ? `invalid property value submitted: "${value}" for option --${property}\n
                        requires on of these values: "${option.values.join(", ")}"\n\n`
                        : []);
                }
            }
        }

        return errors;
    }

    /**
     * load options from file
     *
     * @static
     * @param {string} configFile
     * @returns {IDataNode}
     * @memberof OptionHelper
     */
    public static loadFromFile(configFile: string): IDataNode {

        if ( ! existsSync(configFile) ) {
            throw new Error(
                `configuration file ${configFile} not exists. Please check your
                command line arguments for --config.\n\n`);
        }

        const configData = readFileSync(configFile, {
            encoding: "utf8" });

        return JSON.parse(configData);
    }
}
