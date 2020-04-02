const rest = require('../../utils/rest.js');
const check = require('../../utils/check.js');

class BoletoLog {
    constructor({created, type, errors, boleto = null, id = null}) {
        this.created = check.date(created);
        this.type = type;
        this.errors = errors;
        this.boleto = boleto;
        this.id = id;
    }
}

exports.BoletoLog = BoletoLog;
let resource = exports.BoletoLog;


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
