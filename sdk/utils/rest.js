const starkHost = require('starkcore').starkHost;
const rest = require('starkcore').rest;
const starkBank = require('../../index.js')

const apiVersion = starkBank.apiVersion
const sdkVersion = starkBank.version
const host = starkHost.bank
const timeout = starkBank.timeout

exports.getList = async function* (resource, query, user = starkBank.user) {
    yield* rest.getList(
        sdkVersion,
        host,
        apiVersion,
        resource,
        user,
        language = starkBank.language,
        timeout,
        query
    );
};

exports.post = async function (resource, entities, user = starkBank.user, { ...query } = {}) {
    return rest.post( 
        sdkVersion,
        host,
        apiVersion,
        user,
        resource,
        entities,
        language = starkBank.language,
        timeout,
        query
    );
};

exports.getId = async function (resource, id, user = starkBank.user, { ...query } = {}) {
    return rest.getId(
        sdkVersion,
        host,
        apiVersion,
        user,
        resource,
        id,
        language = starkBank.language,
        timeout,
        query
    );
};

exports.getPublicKey = async function (user = starkBank.user) {
    return rest.getPublicKey(
        sdkVersion,
        host,
        apiVersion,
        user,
        language = starkBank.language,
        timeout
    );
};

exports.getContent = async function (resource, id, user = starkBank.user, query = {}, subResource){
    return rest.getContent(
        sdkVersion,
        host,
        apiVersion,
        user,
        resource,
        id,
        subResource,
        language = starkBank.language,
        timeout,
        query
    );
};

exports.deleteId = async function (resource, id, user = starkBank.user) {
    return rest.deleteId(
        sdkVersion,
        host,
        apiVersion,
        user,
        resource,
        id,
        language = starkBank.language,
        timeout,
    );
};

exports.postSingle = async function (resource, query, user = starkBank.user) {
    return rest.postSingle(
        sdkVersion,
        host,
        apiVersion,
        user,
        resource,
        language = starkBank.language,
        timeout,
        query
    );
};

exports.patchId = async function (resource, id, payload, user = starkBank.user) {
    return rest.patchId(
        sdkVersion,
        host,
        apiVersion,
        user,
        resource,
        id,
        payload,
        language = starkBank.language,
        timeout
    );
};

exports.getSubResource = async function (resource, id, subResource, user = starkBank.user) {
    return rest.getSubResource(
        sdkVersion,
        host,
        apiVersion,
        user,
        resource,
        id,
        subResource,
        language = starkBank.language,
        timeout
    );
};

exports.postSubResource = async function (resource, id, subResource, payload, user = starkBank.user ) {
    return rest.postSubResource(
        sdkVersion,
        host,
        apiVersion,
        user,
        id,
        subResource,
        resource,
        payload,
        language = starkBank.language,
        timeout
    );
}

exports.getPage = async function (resource, query = {}, user = starkBank.user ) {
    return rest.getPage(
        sdkVersion,
        host,
        apiVersion,
        resource,
        user,
        language = starkBank.language,
        timeout,
        query
    );
};

exports.putMulti = async function (resource, entities, user = starkBank.user, query = {}) {
    return rest.putMulti(
        sdkVersion,
        host,
        apiVersion,
        user,
        resource,
        entities,
        language,
        timeout,
        query
    );
};

exports.postRaw = async function (path, payload, prefix = null, throwError, user = starkBank.user, { ...query } = {}) {
    return rest.postRaw(
        sdkVersion,
        host,
        apiVersion,
        path,
        payload,
        user,
        language = starkBank.language,
        timeout,
        query,
        prefix,
        throwError
    );
};

exports.getRaw = async function (path, query = {}, prefix = null, throwError, user = starkBank.user ) {
    return rest.getRaw(
        sdkVersion,
        host,
        apiVersion,
        path,
        user,
        language = starkBank.language,
        timeout,
        query,
        prefix,
        throwError
    )
}

exports.patchRaw = async function (path, payload, prefix = null, throwError, user = starkBank.user, { ...query } = {}) {
    return rest.patchRaw(
        sdkVersion,
        host,
        apiVersion,
        path,
        payload,
        user,
        language = starkBank.language,
        timeout,
        query,
        prefix,
        throwError
    );
};

exports.putRaw = async function (path, payload, prefix = null, throwError, user = starkBank.user, { ...query } = {}) {
    return rest.putRaw(
        sdkVersion,
        host,
        apiVersion,
        path,
        payload,
        user,
        language = starkBank.language,
        timeout,
        query,
        prefix,
        throwError
    );
};

exports.deleteRaw = async function (path, payload, prefix = null, throwError, user = starkBank.user, { ...query } = {}) {
    return rest.deleteRaw(
        sdkVersion,
        host,
        apiVersion,
        path,
        payload,
        user,
        language = starkBank.language,
        timeout,
        query,
        prefix,
        throwError
    );
};
