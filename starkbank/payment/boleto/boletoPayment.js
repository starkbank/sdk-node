const rest = require('../../utils/rest.js');

class BoletoPayment {
    constructor({
                    taxId, description, scheduled = null,
                    line = null, barCode = null, tags = null,
                    status=null, amount = null, fee = null, created = null
                }) {
        this.taxId = taxId;
        this.description = description;
        this.scheduled = scheduled;
        this.line = line;
        this.barCode = barCode;
        this.tags = tags;
        this.status = status;
        this.amount = amount;
        this.fee = fee;
        this.created = created;
    }
}

exports.BoletoPayment = BoletoPayment;
let resource = exports.BoletoPayment;

exports.create = async function (payments, user = null) {
    return rest.post(resource, payments, user);
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