const decamelize = require('decamelize');


exports.endpoint = function (resource) {
    return decamelize(resource, '-').replace('-log', '/log');
};