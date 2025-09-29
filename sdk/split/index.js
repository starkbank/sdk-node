const split = require('./split.js');

exports.log = require('./log');
exports.get = split.get;
exports.query = split.query;
exports.page = split.page;
exports.Split = split.Split;