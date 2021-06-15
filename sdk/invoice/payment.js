const SubResource = require('../utils/subResource.js').SubResource


class Payment extends SubResource {
    constructor(name, taxId, bankCode, branchCode, accountNumber, accountType, amount, endToEndId, method) {
        super();
        this.name = name;
        this.taxId = taxId;
        this.bankCode = bankCode;
        this.branchCode = branchCode;
        this.accountNumber = accountNumber;
        this.accountType = accountType;
        this.amount = amount;
        this.endToEndId = endToEndId;
        this.method = method;
    }
}

exports.subResource = {"class": new Payment, "name": "Payment"}
