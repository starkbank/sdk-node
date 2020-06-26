issPayment = require('./issPayment.js');

exports.log = require('./log');
exports.create = issPayment.create;
exports.get = issPayment.get;
exports.query = issPayment.query;
exports.pdf = issPayment.pdf;
exports.delete = issPayment.delete;
exports.IssPayment = issPayment.IssPayment;