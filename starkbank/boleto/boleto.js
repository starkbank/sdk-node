const rest = require('../utils/rest.js');

class Boleto {
    constructor(amount, name, taxId, streetLine1, streetLine2, district, city, stateCode, zipCode,
                due = null, fine = null, interest = null, overdueLimit = null,
                tags = null, descriptions = null, id = null, fee = null,
                line = null, barCode = null, status = null, created = null) {
        this.amount = amount;
        this.name = name;
        this.taxId = taxId;
        this.streetLine1 = streetLine1;
        this.streetLine2 = streetLine2;
        this.district = district;
        this.city = city;
        this.stateCode = stateCode;
        this.zipCode = zipCode;
        this.due = due;
        this.fine = fine;
        this.interest = interest;
        this.overdueLimit = overdueLimit;
        this.tags = tags;
        this.descriptions = descriptions;
        this.fee = fee;
        this.id = id;
        this.line = line;
        this.barCode = barCode;
        this.status = status;
        this.created = created; // TODO check datetime
    }
}

exports.Boleto = Boleto;
let resource = exports.Boleto;

exports.create = async function (boletos, user = null) {
    return rest.post(resource, boletos, user);
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