const verifiedAccount = require('./verifiedAccount.js');

exports.log = require('./log');
exports.create = verifiedAccount.create;
exports.get = verifiedAccount.get;
exports.cancel = verifiedAccount.cancel;
exports.query = verifiedAccount.query;
exports.page = verifiedAccount.page;
exports.VerifiedAccount = verifiedAccount.VerifiedAccount;
