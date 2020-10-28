const starkbank = require('../../index.js');


exports.generateExampleWebhook = function () {
    return new starkbank.Webhook({
        url: 'https://webhook.site/' + (new Date()).getTime().toString(36),
        subscriptions: ['transfer', 'boleto', 'boleto-payment', 'utility-payment'],
    });
};
