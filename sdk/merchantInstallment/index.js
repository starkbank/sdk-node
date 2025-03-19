const merchantInstallment = require('./merchantInstallment.js');

exports.log = require('./log');
exports.get = merchantInstallment.get;
exports.query = merchantInstallment.query;
exports.page = merchantInstallment.page;
exports.MerchantInstallment = merchantInstallment.MerchantInstallment;
