const api = require('./api.js');
const fetch = require('./request').fetch;
const fetchBuffer = require('./request').fetchBuffer;


exports.getList = async function* (resource, query, user = null) {
    let json;
    let response;
    let list;
    let cursor = '';
    let limit = query['limit'] ? query['limit'] : null;
    let names = api.lastPlural(resource['name']);
    let endpoint = `${api.endpoint(resource['name'])}`;
    do {
        if (!query) {
            query = {};
        } else {
            for (let key in query) {
                if (Array.isArray(query[key])) {
                    query[key] = query[key].join();
                }
            }
        }
        Object.assign(query, {
            'limit': Math.min(100, limit),
            'cursor': cursor,
        });
        response = await fetch(`/${endpoint}`, method = 'GET', null, query, user, 'v2');
        json = response.json();
        list = json[api.lastName(names)];
        cursor = json['cursor'];
        if (limit) {
            limit -= 100;
        }
        for (let entity of list) {
            yield Object.assign(new resource['class'](entity), entity);
        }
    } while (cursor && (limit === null || limit > 0));
};

exports.post = async function (resource, entities, user = null) {
    let names = api.lastPlural(resource['name']);
    let endpoint = `${api.endpoint(resource['name'])}`;
    for (let entity of entities) {
        api.removeNullKeys(entity);
    }
    let payload = {};
    payload[names] = entities;
    let response = await fetch(`/${endpoint}`, 'POST', payload, null, user);
    let json = response.json();
    let list = json[api.lastName(names)];
    let newList = [];
    for (let entity of list) {
        let newResource = new resource['class'](entity);
        newList.push(Object.assign(newResource, entity));
    }
    return newList;
};

exports.getPdf = async function (resource, id, options = {}, user = null) {
    let endpoint = `${api.endpoint(resource['name'])}/${id}/pdf`;
    let response = await fetchBuffer(`/${endpoint}`, 'GET', null, options, user);
    return response.content;
};

exports.getQrcode = async function (resource, id, options = {}, user = null) {
    let endpoint = `${api.endpoint(resource['name'])}/${id}/qrcode`;
    let response = await fetchBuffer(`/${endpoint}`, 'GET', null, options, user);
    return response.content;
};

exports.getId = async function (resource, id, user = null, callback) {
    let name = resource['name'];
    let endpoint = `${api.endpoint(resource['name'])}/${id}`;
    let response = await fetch(`/${endpoint}`, 'GET', null, null, user);
    let json = response.json();
    let returnEntity = json[api.lastName(name)];
    return Object.assign(new resource['class'](returnEntity), returnEntity);
};

exports.getPublicKey = async function (user) {
    let response = await fetch(path = '/public-key', 'GET', null, {'limit': 1}, user);
    let json = response.json();
    return json['publicKeys'][0]['content'];
};

exports.deleteId = async function (resource, id, user = null) {
    let name = resource['name'];
    let endpoint = `${api.endpoint(resource['name'])}/${id}`;
    let response = await fetch(`/${endpoint}`, 'DELETE', null, null, user);
    let json = response.json();
    let returnEntity = json[api.lastName(name)];
    return Object.assign(new resource['class'](returnEntity), returnEntity);
};

exports.postSingle = async function (resource, options, user = null) {
    let name = api.lastName(resource['name']);
    let endpoint = `${api.endpoint(resource['name'])}`;
    let payload = Object.assign(new resource['class']({}), options);
    api.removeNullKeys(payload);
    let response = await fetch(`/${endpoint}`, 'POST', payload, null, user);
    let json = response.json();
    let returnEntity = json[name];
    return Object.assign(new resource['class'](returnEntity), returnEntity);
};

exports.patchId = async function (resource, id, payload, user = null) {
    let name = resource['name'];
    let endpoint = `${api.endpoint(resource['name'])}/${id}`;
    api.removeNullKeys(payload);
    let response = await fetch(`/${endpoint}`, 'PATCH', payload, null, user);
    let json = response.json();
    let returnEntity = json[api.lastName(name)];
    return Object.assign(new resource['class'](returnEntity), returnEntity);
};

exports.getSubResource = async function (resource, id, subResource, user = null ) {
    let endpoint = `${api.endpoint(resource['name'])}`;
    let subResourceEndpoint = `${api.endpoint(subResource['name'])}`;
    let path = `${endpoint}/${id}/${subResourceEndpoint}`;
    let response = await fetch(`/${path}`, 'GET', null, null, user);
    let json = response.json();
    let returnEntity = json[api.lastName(subResourceEndpoint)];
    return Object.assign(new subResource['class'].constructor(returnEntity), returnEntity);
};

exports.getPage = async function (resource, options = {}, user = null ) {
    let endpoint = `${api.endpoint(resource['name'])}`;
    let response = await fetch(`/${endpoint}`, 'GET', null, options, user);
    let json = response.json();
    let returnEntities = json[api.lastPlural(resource['name'])];
    let entities = [];
    let cursor = json['cursor'];
    for (let entity of returnEntities) {
        entities.push(Object.assign(new resource['class'](entity), entity));
    }

    return [entities, cursor];
};
