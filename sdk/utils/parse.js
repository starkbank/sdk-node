
const parse = require('starkcore').parse;
const starkBank = require('../../index.js');
const starkHost = require('starkcore').starkHost;

const apiVersion = starkBank.apiVersion;
const sdkVersion = starkBank.version;
const host = starkHost.bank;
const timeout = starkBank.timeout;

exports.parseObjects = function (objects, resource, resourceClass) {
    return parse.parseObjects(
        objects,
        resource,
        resourceClass
    );
}

exports.parseAndVerify = async function (resource, content, signature, user = starkBank.user) {
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

exports.verify = async function (content, signature, user = starkBank.user) {
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
