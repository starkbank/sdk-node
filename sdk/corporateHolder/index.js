const corporateHolder = require('./corporateHolder.js');
const permission = require('./permission.js');

exports.create = corporateHolder.create;
exports.get = corporateHolder.get;
exports.query = corporateHolder.query;
exports.page = corporateHolder.page;
exports.update = corporateHolder.update;
exports.cancel = corporateHolder.cancel;
exports.CorporateHolder = corporateHolder.CorporateHolder;
exports.Permission = permission.Permission;
exports.log = require('./log');
