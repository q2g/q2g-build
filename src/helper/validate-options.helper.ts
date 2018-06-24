import { IDataNode, OptionProperties } from "../api";

/**
 * @todo refactoring
 */
export function validateOptions(options: IDataNode): string[] {

    let errors: string[] = [];

    for (const property in OptionProperties) {

        if ( ! OptionProperties.hasOwnProperty(property) ) {
            continue;
        }

        const option    = OptionProperties[property];
        const optionSet = options.hasOwnProperty(property);
        const value     = (options[property] || "").toString();

        if ( option.required && ! optionSet) {
            errors.push(`option: ${property} is required\ncall with --${property} [${option.values.join("| ")}]\n\n`);
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
