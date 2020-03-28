const api = require('./api.js');
const apiFetch = require('./request').apiFetch;

exports.getList = async function* (resource, limit = 100, user = null) {
    let json;
    let response;
    let list;
    let query;
    let cursor = '';
    let entity = new resource;
    let names = api.lastPlural(entity.constructor.name);
    let endpoint = `${api.endpoint(entity.constructor.name)}`;
    do {
        query = {
            'limit': limit,
            'cursor': cursor,
        };
        response = await apiFetch(user, `/${endpoint}`, method = 'GET', null, query, 'v2');
        json = JSON.parse(response.content);
        list = json[api.lastName(names)];
        cursor = json['cursor'];
        if (limit) {
            limit -= 100;
        }
        for (let entity of list) {
            yield Object.assign(new resource, entity);
        }
    } while (cursor && (limit && limit >= 0));
};

exports.post = async function (resource, entities, user = null) {
    let entity = new resource;
    let names = api.lastPlural(entity.constructor.name);
    let endpoint = `${api.endpoint(entity.constructor.name)}`;
    for (let i in entities) {
        Object.keys(entities[i]).forEach(key => entities[i][key] === null && delete entities[i][key]);
    }
    let payload = {};
    payload[names] = entities;
    console.log(payload);
    let response = await apiFetch(user, `/${endpoint}`, 'POST', payload, null, 'v2');
    let list = JSON.parse(response.content)[api.lastName(names)];
    let newList = [];
    for (let entity of list) {
        newList.push(Object.assign(new resource, entity));
    }
    return newList;
};

exports.getPdf = function (resource, entities, user = null) {

};

exports.getId = async function (resource, id, user = null, callback) {
    let entity = new resource;
    let name = entity.constructor.name;
    let endpoint = `${api.endpoint(name)}/${id}`;
    let response = await apiFetch(user, `/${endpoint}`, 'GET', null, null, 'v2');
    let returnEntity = JSON.parse(response.content)[api.lastName(name)];
    return Object.assign(entity, returnEntity);
};

exports.deleteId = async function (resource, id, user = null) {
    let entity = new resource;
    let name = entity.constructor.name;
    let endpoint = `${api.endpoint(name)}/${id}`;
    let response = await apiFetch(user, `/${endpoint}`, 'DELETE', null, null, 'v2');
    let returnEntity = JSON.parse(response.content)[api.lastName(name)];
    return Object.assign(entity, returnEntity);
};

exports.postSingle = function (resource, entities, user = null) {

};