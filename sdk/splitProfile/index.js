const splitProfile = require('./splitProfile.js');

exports.log = require('./log');
exports.put = splitProfile.put;
exports.get = splitProfile.get;
exports.query = splitProfile.query;
exports.page = splitProfile.page;
exports.SplitProfile = splitProfile.SplitProfile;
