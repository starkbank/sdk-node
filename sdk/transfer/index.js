const transfer = require('./transfer.js');

exports.log = require('./log');
exports.create = transfer.create;
exports.delete = transfer.delete;
exports.query = transfer.query;
exports.get = transfer.get;
exports.pdf = transfer.pdf;
exports.page = transfer.page;
exports.Transfer = transfer.Transfer;
