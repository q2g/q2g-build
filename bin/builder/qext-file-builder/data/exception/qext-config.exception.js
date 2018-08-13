"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QextConfigurationException extends Error {
    constructor(msg = "") {
        super(msg);
        Object.setPrototypeOf(this, QextConfigurationException.prototype);
    }
}
exports.QextConfigurationException = QextConfigurationException;
