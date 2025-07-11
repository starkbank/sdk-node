
const parse = require('starkcore').parse;
const {apiVersion, sdkVersion, host, timeout } = require('../utils/rest.js');
const starkBank = require('../../index.js');


exports.parseObjects = function (objects, resource, resourceClass) {
    return parse.parseObjects(
        objects,
        resource,
        resourceClass
    );
}

exports.parseAndVerify = async function (resource, content, signature, user = null) {
    return parse.parseAndVerify(
        resource,
        content,
        signature,
        sdkVersion,
        apiVersion,
        host,
        user,
        starkBank.language,
        timeout
    );
}

exports.verify = async function (content, signature, user = null) {
    return parse.verify (
        content,
        signature,
        sdkVersion,
        apiVersion,
        host,
        user,
        starkBank.language,
        timeout
    );
}
