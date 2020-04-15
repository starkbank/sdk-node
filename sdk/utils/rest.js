const api = require('./api.js');
const fetch = require('./request').fetch;


exports.getList = async function* (resource, query, user = null) {
    let json;
    let response;
    let list;
    let cursor = '';
    let limit = query['limit'] ? query['limit'] : null;
    let entity = new resource['class']({});
    let names = api.lastPlural(entity.constructor.name);
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
        json = JSON.parse(response.content);
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
    let entity = new resource['class']({});
    let names = api.lastPlural(entity.constructor.name);
    let endpoint = `${api.endpoint(resource['name'])}`;
    for (let entity of entities) {
        Object.keys(entity).forEach(key => entity[key] === null && delete entity[key]);
    }
    let payload = {};
    payload[names] = entities;
    let response = await fetch(`/${endpoint}`, 'POST', payload, null, user);
    let list = JSON.parse(response.content)[api.lastName(names)];
    let newList = [];
    for (let entity of list) {
        let newResource = new resource['class'](entity);
        newList.push(Object.assign(newResource, entity));
    }
    return newList;
};

exports.getPdf = async function (resource, id, user = null) {
    let entity = new resource['class']({});
    let name = entity.constructor.name;
    let endpoint = `${api.endpoint(resource['name'])}/${id}/pdf`;
    let response = await fetch(`/${endpoint}`, 'GET', null, null, user);
    return response.content;
};

exports.getId = async function (resource, id, user = null, callback) {
    let entity = new resource['class']({});
    let name = entity.constructor.name;
    let endpoint = `${api.endpoint(resource['name'])}/${id}`;
    let response = await fetch(`/${endpoint}`, 'GET', null, null, user);
    let returnEntity = JSON.parse(response.content)[api.lastName(name)];
    return Object.assign(new resource['class'](returnEntity), returnEntity);
};

exports.getPublicKey = async function (user) {
    let response = await fetch(path = '/public-key', 'GET', null, {'limit': 1}, user);
    return JSON.parse(response)['publicKeys'][0]['content'];
};

exports.deleteId = async function (resource, id, user = null) {
    let entity = new resource['class']({});
    let name = entity.constructor.name;
    let endpoint = `${api.endpoint(resource['name'])}/${id}`;
    let response = await fetch(`/${endpoint}`, 'DELETE', null, null, user);
    let returnEntity = JSON.parse(response.content)[api.lastName(name)];
    return Object.assign(new resource['class'](returnEntity), returnEntity);
};

exports.postSingle = async function (resource, options, user = null) {
    let entity = new resource['class']({});
    let name = api.lastName(entity.constructor.name);
    let endpoint = `${api.endpoint(resource['name'])}`;
    let payload = Object.assign(entity, options);
    let response = await fetch(`/${endpoint}`, 'POST', payload, null, user);
    let returnEntity = JSON.parse(response.content)[name];
    return Object.assign(new resource['class'](returnEntity), returnEntity);
};

exports.patchId = async function (resource, id, payload, user = null) {
    let entity = new resource['class']({});
    let name = entity.constructor.name;
    let endpoint = `${api.endpoint(resource['name'])}/${id}`;
    let response = await fetch(`/${endpoint}`, 'PATCH', payload, null, user);
    let returnEntity = JSON.parse(response.content)[api.lastName(name)];
    return Object.assign(new resource['class'](returnEntity), returnEntity);
};