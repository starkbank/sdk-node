const starkbank = require('../../index.js');


exports.generateExampleWebhook = function () {
    return new starkbank.Webhook({
        url: 'https://webhook.site/a10b29fc-45cf-4a09-b743-b7dff8c9eea5',
        subscriptions: ['transfer', 'boleto', 'boleto-payment', 'boleto-holmes', 'brcode-payment', 'utility-payment', 'deposit', 'invoice'],
    });
};
