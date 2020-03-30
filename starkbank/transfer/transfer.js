const rest = require('../utils/rest.js');

class Transfer {
    constructor(amount, name, taxId, bankCode, branchCode, accountNumber, tags = null) {
        this.amount = amount;
        this.name = name;
        this.taxId = taxId;
        this.bankCode = bankCode;
        this.branchCode = branchCode;
        this.accountNumber = accountNumber;
        this.tags = tags;
    }
}

exports.Transfer = Transfer;
let resource = exports.Transfer;

exports.create = async function (transfers, user = null) {
    return rest.post(resource, transfers, user);
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