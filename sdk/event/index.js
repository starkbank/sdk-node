const event = require('./event.js');

exports.attempt = require('./attempt');
exports.get = event.get;
exports.query = event.query;
exports.delete = event.delete;
exports.parse = event.parse;
exports.update = event.update;
exports.page = event.page;
exports.Event = event.Event;
