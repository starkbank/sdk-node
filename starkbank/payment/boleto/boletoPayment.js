const rest = require('../../utils/rest.js');

class BoletoPayment {
    constructor(taxId, description, scheduled = null,
                line = null, barCode = null, tags = null) {
        this.taxId = taxId;
        this.description = description;
        this.scheduled = scheduled;
        this.line = line;
        this.barCode = barCode;
        this.tags = tags;
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