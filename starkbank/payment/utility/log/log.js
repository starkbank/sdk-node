const rest = require('../../../utils/rest.js');

class UtilityPaymentLog {
    constructor(created, type, errors, payment, id = null) {
        this.created = created;
        this.type = type;
        this.errors = errors;
        this.payment = payment;
        this.id = id;
    }
}

exports.UtilityPaymentLog = UtilityPaymentLog;
let resource = exports.UtilityPaymentLog;


exports.get = async function (id, user = null) {
    return rest.getId(resource, id, user);
};

exports.query = async function ({limit = null, status = null, tags = null, paymentIds = null, after = null, before = null}, user = null) {
    let query = {
        limit: limit,
        status: status,
        tags: tags,
        paymentIds: paymentIds,
        after: after,
        before: before,
    };
    return rest.getList(resource, query, user);
};
