const starkbank = require('starkbank');
const uniqueId = require('./uniqueId.js').uniqueId;


exports.generateExampleWebhook = function () {
    return new starkbank.Webhook({
        url: 'https://webhook.site/' + uniqueId(),
        subscriptions: ['transfer', 'boleto', 'boleto-payment', 'boleto-holmes', 'brcode-payment', 'utility-payment', 'deposit', 'invoice'],
    });
};
