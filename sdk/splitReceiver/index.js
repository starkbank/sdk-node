const splitReceiver = require('./splitReceiver.js');

exports.log = require('./log');
exports.create = splitReceiver.create;
exports.get = splitReceiver.get;
exports.query = splitReceiver.query;
exports.page = splitReceiver.page;
exports.SplitReceiver = splitReceiver.SplitReceiver;
