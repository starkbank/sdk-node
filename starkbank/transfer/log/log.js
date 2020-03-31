const rest = require('../../utils/rest.js');

class TransferLog {
    constructor({created, type, errors, transfer = null}) {
        this.created = created; // TODO check datetime
        this.type = type;
        this.errors = errors;
        this.transfer = transfer;
    }
}

exports.TransferLog = TransferLog;
let resource = exports.TransferLog;


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
