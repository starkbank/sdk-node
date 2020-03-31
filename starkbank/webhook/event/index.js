const event = require('./event.js');
exports.get = event.get;
exports.query = event.query;
exports.delete = event.delete;
exports.parse = event.parse;
exports.setDelivered = event.setDelivered;
exports.Event = event.Event;