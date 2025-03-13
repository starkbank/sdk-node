const dynamicBrcode = require('./dynamicBrcode.js');
const rule = require('./rule/rule.js')

exports.create = dynamicBrcode.create;
exports.query = dynamicBrcode.query;
exports.get = dynamicBrcode.get;
exports.page = dynamicBrcode.page;
exports.DynamicBrcode = dynamicBrcode.DynamicBrcode;
exports.Rule = rule.Rule;
