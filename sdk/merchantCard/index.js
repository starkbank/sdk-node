const merchantCard = require('./merchantCard.js');

exports.log = require('./log');
exports.get = merchantCard.get;
exports.query = merchantCard.query;
exports.page = merchantCard.page;
exports.MerchantCard = merchantCard.MerchantCard;
