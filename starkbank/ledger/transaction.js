const rest = require('../utils/rest.js');

class Transaction {
    constructor(amount, description, external_id, receiver_id, tags = null) {
        this.amount = amount;
        this.description = description;
        this.external_id = external_id;
        this.receiver_id = receiver_id;
        this.tags = tags;
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
