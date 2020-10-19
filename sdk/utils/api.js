const decamelize = require('decamelize');
const Resource = require('./resource.js').Resource


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

exports.removeNullKeys = function(dict) {
   Object.entries(dict).forEach(([key, value]) => {
        if (value == null)
            delete dict[key];
        else if (value.constructor == Object || value instanceof Resource)
            exports.removeNullKeys(value);
   });
}
