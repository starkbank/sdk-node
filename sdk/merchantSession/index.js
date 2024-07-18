const merchantSession = require('./merchantSession.js');
exports.log = require('./log');
exports.MerchantSession = merchantSession.MerchantSession;
exports.create = merchantSession.create;
exports.purchase = merchantSession.purchase;
exports.query = merchantSession.query;
exports.get = merchantSession.get;
exports.page = merchantSession.page;