const deposit = require('./deposit.js');

exports.log = require('./log');
exports.get = deposit.get;
exports.query = deposit.query;
exports.page = deposit.page;
exports.Deposit = deposit.Deposit;
