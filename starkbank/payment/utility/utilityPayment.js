const rest = require('../../utils/rest.js');

class UtilityPayment {
    constructor(description, scheduled = null, line = null, barCode = null,
                tags = null, amount = null, status = null, created = null) {
        this.description = description;
        this.scheduled = scheduled; // TODO check datetime
        this.barCode = barCode;
        this.line = line;
        this.tags = tags;
        this.amount = amount;
        this.status = status;
        this.created = created; // TODO check datetime
    }
}

exports.UtilityPayment = UtilityPayment;
let resource = exports.UtilityPayment;


exports.create = async function (payments, user = null) {
    return rest.post(resource, payments, user);
};

exports.get = async function (id, user = null) {
    return rest.getId(resource, id, user);
};

exports.getPdf = async function (id, user = null) {
    return rest.getPdf(resource, id, user);
};

exports.query = async function (limit = null, status = null, tags = null, ids = null, after = null, before = null, user = null) {
    return rest.getList(resource, limit, user);
};

exports.delete = async function (id, user = null) {
    return rest.deleteId(resource, id, user);
};