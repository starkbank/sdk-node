const starkHost = require('starkcore').starkHost;
const rest = require('starkcore').rest;
const starkBank = require('../../index.js')

const apiVersion = 'v2'
const sdkVersion = '2.13.0'
const host = starkHost.bank
const language = 'en-US'
const timeout = 2000

exports.getList = async function* (resource, query, user = starkBank.user) {
    yield* rest.getList(
        sdkVersion,
        host,
        apiVersion,
        resource,
        user,
        language,
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
        language,
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
        language,
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
        language,
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
        language,
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
        language,
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
        language,
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
        language,
        timeout
    );
};

exports.getSubResource = async function (resource, id, subResource, user = starkBank.user ) {
    return rest.getSubResource(
        sdkVersion,
        host,
        apiVersion,
        user,
        resource,
        id,
        subResource,
        language,
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
        language,
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
        language,
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
        language,
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
        language,
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
        language,
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
        language,
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
        language,
        timeout,
        query,
        prefix,
        throwError
    );
};

exports.apiVersion = 'v2'
exports.sdkVersion = '2.13.0'
exports.host = starkHost.infra;
exports.language = 'en-US';
exports.timeout = 2000
