const rest = require('../utils/rest.js');

class Webhook {
    constructor({url, subscriptions, id = null}) {
        this.url = url;
        this.subscriptions = subscriptions;
        this.id = id;
    }
}

exports.Webhook = Webhook;
let resource = exports.Webhook;

exports.create = async function ({url, subscriptions,}, user = null) {
    let options = {
        url: url,
        subscriptions: subscriptions,
    };
    return rest.postSingle(resource, options, user);
};

exports.get = async function (id, user = null) {
    return rest.getId(resource, id, user);
};

exports.pdf = async function (id, user = null) {
    return rest.getPdf(resource, id, user);
};

exports.query = async function ({limit = null, status = null, tags = null, ids = null, after = null, before = null}, user = null) {
    let query = {
        limit: limit,
        status: status,
        tags: tags,
        ids: ids,
        after: after,
        before: before,
    };
    return rest.getList(resource, query, user);
};

exports.delete = async function (id, user = null) {
    return rest.deleteId(resource, id, user);
};