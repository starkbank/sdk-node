utilityPayment = require('./utilityPayment.js');

exports.log = require('./log');
exports.create = utilityPayment.create;
exports.get = utilityPayment.get;
exports.query = utilityPayment.query;
exports.pdf = utilityPayment.pdf;
exports.delete = utilityPayment.delete;
exports.UtilityPayment = utilityPayment.UtilityPayment;