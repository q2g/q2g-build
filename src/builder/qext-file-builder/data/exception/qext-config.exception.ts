export class QextConfigurationException extends Error {

    public constructor(msg = "") {
        super(msg);
        Object.setPrototypeOf(this, QextConfigurationException.prototype);
    }
}
