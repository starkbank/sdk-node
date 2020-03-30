const api = require('./api.js');
const fetch = require('./request').fetch;

exports.getList = async function* (resource, limit = 100, query, user = null) {
    let json;
    let response;
    let list;
    let cursor = '';
    let entity = new resource;
    let names = api.lastPlural(entity.constructor.name);
    let endpoint = `${api.endpoint(entity.constructor.name)}`;
    do {
        if (!query) {
            query = {};
        }
        Object.assign(query, {
            'limit': limit,
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
            yield Object.assign(new resource, entity);
        }
    } while (cursor && (limit === null || limit > 0));
};

exports.post = async function (resource, entities, user = null) {
    let entity = new resource;
    let names = api.lastPlural(entity.constructor.name);
    let endpoint = `${api.endpoint(entity.constructor.name)}`;
    for (let entity of entities) {
        Object.keys(entity).forEach(key => entity[key] === null && delete entity[key]);
    }
    let payload = {};
    payload[names] = entities;
    let response = await fetch(`/${endpoint}`, 'POST', payload, null, user);
    let list = JSON.parse(response.content)[api.lastName(names)];
    let newList = [];
    for (let entity of list) {
        newList.push(Object.assign(new resource, entity));
    }
    return newList;
};

exports.getPdf = async function (resource, id, user = null) {
    let entity = new resource;
    let name = entity.constructor.name;
    let endpoint = `${api.endpoint(name)}/${id}/pdf`;
    let response = await fetch(`/${endpoint}`, 'GET', null, null, user);
    return response.content;
};

exports.getId = async function (resource, id, user = null, callback) {
    let entity = new resource;
    let name = entity.constructor.name;
    let endpoint = `${api.endpoint(name)}/${id}`;
    let response = await fetch(`/${endpoint}`, 'GET', null, null, user);
    let returnEntity = JSON.parse(response.content)[api.lastName(name)];
    return Object.assign(entity, returnEntity);
};

exports.deleteId = async function (resource, id, user = null) {
    let entity = new resource;
    let name = entity.constructor.name;
    let endpoint = `${api.endpoint(name)}/${id}`;
    let response = await fetch(`/${endpoint}`, 'DELETE', null, null, user);
    let returnEntity = JSON.parse(response.content)[api.lastName(name)];
    return Object.assign(entity, returnEntity);
};

exports.postSingle = async function (resource, options, user = null) {
    let entity = new resource;
    let name = api.lastName(entity.constructor.name);
    let endpoint = `${api.endpoint(entity.constructor.name)}`;
    let payload = Object.assign(entity, options);
    console.log(payload);
    let response = await fetch(`/${endpoint}`, 'POST', payload, null, user);
    let returnEntity = JSON.parse(response.content)[name];
    return Object.assign(entity, returnEntity);
};