const starkHost = require('starkcore').starkHost;
const rest = require('starkcore').rest;

const apiVersion = 'v2'
const sdkVersion = '2.13.0'
const host = starkHost.bank
const language = 'en-US'
const timeout = 2000

exports.getList = async function* (resource, query, user = null) {
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

exports.post = async function (resource, entities, user = null, { ...query } = {}) {
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

exports.getId = async function (resource, id, user = null, { ...query } = {}) {
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

exports.getPublicKey = async function (user) {
    return rest.getPublicKey(
        sdkVersion,
        host,
        apiVersion,
        user,
        language,
        timeout
    );
};

exports.getContent = async function (resource, id, user, query = {}, subResource){
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

exports.deleteId = async function (resource, id, user = null) {
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

exports.postSingle = async function (resource, query, user = null) {
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

exports.postRaw = async function (resource, payload, user = null, { ...query } = {}) {
    return rest.postRaw(
        sdkVersion,
        host,
        apiVersion,
        resource,
        payload,
        user,
        language,
        timeout,
        query
    );
};

exports.patchId = async function (resource, id, payload, user = null) {
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

exports.getSubResource = async function (resource, id, subResource, user = null ) {
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

exports.getPage = async function (resource, query = {}, user = null ) {
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

exports.apiVersion = 'v2'
exports.sdkVersion = '2.13.0'
exports.host = starkHost.infra;
exports.language = 'en-US';
exports.timeout = 2000
