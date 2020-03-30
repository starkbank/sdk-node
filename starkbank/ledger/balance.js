const rest = require('../utils/rest.js');

class Balance {
    constructor() {
    }
}

exports.Balance = Balance;
let resource = exports.Balance;


exports.get = async function (user = null) {
    let balance = await rest.getList(resource, 100, user).next();
    return balance['value'];
};
