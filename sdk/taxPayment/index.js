const taxPayment = require('./taxPayment.js');

exports.log = require('./log');
exports.create = taxPayment.create;
exports.get = taxPayment.get;
exports.query = taxPayment.query;
exports.pdf = taxPayment.pdf;
exports.delete = taxPayment.delete;
exports.page = taxPayment.page;
exports.TaxPayment = taxPayment.TaxPayment;
