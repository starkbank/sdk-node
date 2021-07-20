const darfPayment = require('./darfPayment.js');

exports.log = require('./log');
exports.create = darfPayment.create;
exports.get = darfPayment.get;
exports.pdf = darfPayment.pdf;
exports.query = darfPayment.query;
exports.page = darfPayment.page;
exports.delete = darfPayment.delete;
exports.DarfPayment = darfPayment.DarfPayment;
