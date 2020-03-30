const decamelize = require('decamelize');


exports.endpoint = function (resource, keepDash = false) {
    let decamelized = decamelize(resource, '-');
    if (keepDash) {
        return decamelized;
    }
    return decamelized.replace('-log', '/log');
};

exports.lastName = function (resource) {
    let splitString = decamelize(resource, '-').split('-');
    return splitString[splitString.length - 1];
};

exports.lastPlural = function (resource) {
    return `${exports.lastName(resource, true)}s`;
};