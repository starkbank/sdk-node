const starkbank = require('../../starkbank');


exports.generateExampleWebhook = function () {
    return new starkbank.Webhook(
        'https://webhook.site/60e9c18e-4b5c-4369-bda1-ab5fcd8e1b29',
        ['transfer', 'boleto', 'boleto-payment', 'utility-payment'],
    );
};