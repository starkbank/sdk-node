const decamelize = require('decamelize');


exports.fromApiJson = function (resource, entity) {
    return Object.assign(new resource["class"](entity));
};

exports.endpoint = function (resource, keepDash = false) {
    let decamelized = decamelize(resource["name"], '-');
    if (keepDash) {
        return decamelized;
    }
    return decamelized.replace('-log', '/log');
};

exports.lastName = function (resource) {
    let splitString = decamelize(resource["name"], '-').split('-');
    return splitString[splitString.length - 1];
};

exports.lastPlural = function (resource) {
    return `${exports.lastName(resource, true)}s`;
};

exports.lastNamePlural = function (resource) {
    return `${exports.lastName(resource, true)}s`;
};