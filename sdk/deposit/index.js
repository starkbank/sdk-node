const deposit = require('./deposit.js');

exports.log = require('./log');
exports.get = deposit.get;
exports.query = deposit.query;
exports.Deposit = deposit.Deposit;
