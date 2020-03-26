class Balance {
    constructor(amount, name, taxId, streetLine1, streetLine2, district, city, stateCode, zipCode,
                due = null, fine = null, interest = null, overdueLimit = null, tags = null, descriptions = null, id = null,
                fee = null, line = null, barCode = null, status = null, created = null) {
        this.amount = amount;
        this.name = name;
        this.fee = fee;
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
        this.line = line;
        this.barCode = barCode;
        this.status = status;
        this.created = created;
    }
}

exports.Balance = Balance;

exports.create = function (balances, user = null) {
    return rest.post("balance", balances, user);
};

exports.get = function (id, user = null) {
    return new balance(rest.getId("balance", id, user));
};

exports.getPdf = function (id, user = null) {
    return rest.getPdf("balance", id, user);
};

exports.query = function (limit = null, status = null, tags = null, ids = null, after = null, before = null, user = null) {
    return rest.getList("balance", user);
};

exports.delete = function (id, user = null) {
    return rest.delete("balance", id, user);
};