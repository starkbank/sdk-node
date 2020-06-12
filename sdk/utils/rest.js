const api = require('./api.js');
const fetch = require('./request').fetch;
const fetchBuffer = require('./request').fetchBuffer;


exports.getList = async function* ({resource, limit = null, user = null, params = {}}) {
    let query = limit ? {limit:  Math.min(limit, 100)} : {}
    query = {...params, ...query}

    while (true) {
        let response = await fetch({method: "GET", path: `${api.endpoint(resource)}`, query: query, user: user})
        let json = response.json()
        let entities = json[api.lastNamePlural(resource)]

        for (let entity of entities) {
            yield api.fromApiJson(resource, entity);
        }

        if (limit) {
            limit -= 100;
            query["limit"] = Math.min(100, limit)
        }

        cursor = json["cursor"]
        query["cursor"] = cursor
        if (!cursor || (limit !== null && limit <= 0)) {
            break;
        }
    }
};

exports.getId = async function ({resource, id, user = null}) {
    let response = await fetch({method: "GET", path: `${api.endpoint(resource)}/${id}`, user: user});
    let json = response.json();
    let entity = json[api.lastName(resource)]
    return api.fromApiJson(resource, entity);
};

exports.getPdf = async function ({resource, id, params = {}, user = null}) {
    let response = await fetch({method: "GET", path: `${api.endpoint(resource)}/${id}/pdf`, user: user, query: params});
    return response.content;
};

exports.postMulti = async function ({resource, entities, user = null}) {
    let response = await fetch({method: "POST", path: `${api.endpoint(resource)}`, user: user, payload: {
        [api.lastNamePlural(resource)]: entities
    }});
    let json = response.json()
    entities = json[api.lastNamePlural(resource)]
    return entities.map(function(entity) { return api.fromApiJson(resource, entity); })
};

exports.postSingle = async function ({resource, entity, user = null}) {
    let response = await fetch({method: "POST", path: `${api.endpoint(resource)}`, user: user, payload: entity});
    let json = response.json()
    entity = json[api.lastName(resource)]
    return api.fromApiJson(resource, entity);
};

exports.deleteId = async function ({resource, id, user = null}) {
    let response = await fetch({method: "DELETE", path: `${api.endpoint(resource)}/${id}`, user: user});
    let json = response.json()
    let entity = json[api.lastName(resource)]
    return api.fromApiJson(resource, entity);
};

exports.patchId = async function ({resource, id, payload, user = null}) {
    let response = await fetch({method: "PATCH", path: `${api.endpoint(resource)}/${id}`, user: user, payload: payload});
    let json = response.json()
    let entity = json[api.lastName(resource)]
    return api.fromApiJson(resource, entity);
};

exports.getPublicKey = async function ({user = null}) {
    let response = await fetch({method: "GET", path: "/public-key", limit: 1, user: user});
    return response.json()["publicKeys"][0]["content"];
};