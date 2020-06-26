dasPayment = require('./dasPayment.js');

exports.log = require('./log');
exports.create = dasPayment.create;
exports.get = dasPayment.get;
exports.query = dasPayment.query;
exports.pdf = dasPayment.pdf;
exports.delete = dasPayment.delete;
exports.DasPayment = dasPayment.DasPayment;