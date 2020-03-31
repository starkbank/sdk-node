const rest = require('../utils/rest.js');

class Transaction {
    constructor({amount, description, externalId, receiverId, tags = null}) {
        this.amount = amount;
        this.description = description;
        this.externalId = externalId;
        this.receiverId = receiverId;
        this.tags = tags;
        this.fee = fee;
        this.created = created;
        this.source = source;
    }
}

exports.Transaction = Transaction;
let resource = exports.Transaction;

exports.create = async function (transactions, user = null) {
    return rest.post(resource, transactions, user);
};

exports.get = async function (id, user = null) {
    return rest.getId(resource, id, user);
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
