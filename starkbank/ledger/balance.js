const rest = require('../utils/rest.js');

class Balance {
    constructor(id = null, amount = null, currency = null,
                updated = null,) {
        this.amount = amount;
        this.currency = currency;
        this.updated = updated;
        this.id = id;
    }
}

exports.Balance = Balance;
let resource = exports.Balance;


exports.get = async function (user = null) {
    let balance = await rest.getList(resource, 100, user).next();
    return balance['value'];
};
