const brcodePayment = require('./brcodePayment.js');

exports.log = require('./log');
exports.Rule = require('./rule/rule.js').Rule;
exports.rule = require('./rule');
exports.create = brcodePayment.create;
exports.get = brcodePayment.get;
exports.query = brcodePayment.query;
exports.pdf = brcodePayment.pdf;
exports.update = brcodePayment.update;
exports.page = brcodePayment.page;
exports.BrcodePayment = brcodePayment.BrcodePayment;
