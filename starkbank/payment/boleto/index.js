boletoPayment = require('./boletoPayment.js');

exports.log = require('./log');
exports.create = boletoPayment.create;
exports.delete = boletoPayment.delete;
exports.query = boletoPayment.query;
exports.get = boletoPayment.get;
exports.pdf = boletoPayment.pdf;
exports.BoletoPayment = boletoPayment.BoletoPayment;