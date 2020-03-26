const api = require('./api.js');
const apiFetch = require('./request').apiFetch;

exports.getList = function* (resource, cursor = null, limit = 100, user = null) {
    do {
        query = {
            'limit': limit,
            'cursor': cursor,
        };
        Object.assign(query, {});
        let endpoint = api.endpoint(resource);
        apiFetch(user, `/${endpoint}`, method = GET, null, query, 'v2', (response) => {
            let json = JSON.parse(response);
        });
        if (limit) {
            limit -= 100;
        }
    } while (!cursor || (limit && limit <= 0));
};

exports.post = function (resource, entities, user = null) {

};

exports.getPdf = function (resource, entities, user = null) {

};

exports.getId = function (resource, id, user = null, callback) {
    let endpoint = `${api.endpoint(resource)}/${id}`;
    let json;
    apiFetch(user, `/${endpoint}`, 'GET', null, null, 'v2', (response) => {
        json = JSON.parse(response.content);
    });
    callback(json);
};

exports.delete = function (resource, entities, user = null) {

};

exports.postSingle = function (resource, entities, user = null) {

};