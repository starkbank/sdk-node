const rest = require('../../../utils/rest.js');

class BoletoPaymentLog {
    constructor(created, type, errors) {
        this.created = created; // TODO check datetime
        this.type = type;
        this.errors = errors;
        this.payment = null;
    }
}

exports.BoletoPaymentLog = BoletoPaymentLog;
let resource = exports.BoletoPaymentLog;


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
