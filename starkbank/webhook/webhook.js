const rest = require('../utils/rest.js');

class Webhook {
    constructor(url, subscriptions, allowedIps) {
        this.url = url;
        this.subscriptions = subscriptions;
    }
}

exports.Webhook = Webhook;
let resource = exports.Webhook;

exports.create = async function (url, subscriptions, allowedIps = null, user = null) {
    let options = {
        url: url,
        subscriptions: subscriptions,
        allowedIps: allowedIps
    };
    return rest.postSingle(resource, options, user);
};

exports.get = async function (id, user = null) {
    return rest.getId(resource, id, user);
};

exports.pdf = async function (id, user = null) {
    return rest.getPdf(resource, id, user);
};

exports.query = async function (limit = null, status = null, tags = null, ids = null, after = null, before = null, user = null) {
    let query = {
        status: status,
        tags: tags,
        ids: ids,
        after: after,
        before: before,
    };
    return rest.getList(resource, limit, query, user);
};

exports.delete = async function (id, user = null) {
    return rest.deleteId(resource, id, user);
};