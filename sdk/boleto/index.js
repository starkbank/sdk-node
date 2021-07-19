const boleto = require('./boleto.js');

exports.log = require('./log');
exports.create = boleto.create;
exports.delete = boleto.delete;
exports.query = boleto.query;
exports.get = boleto.get;
exports.pdf = boleto.pdf;
exports.page = boleto.page;
exports.Boleto = boleto.Boleto;
