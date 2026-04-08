const starkbank = require('../../index.js');


exports.example = function (accountId) {
    return new starkbank.VerifiedTransfer({
        amount: 1000,
        accountId: accountId,
        tags: ['verified-transfer-test'],
        description: 'Test description',
        displayDescription: 'Test displayDescription',
        rules: [
            new starkbank.transfer.Rule({
                key: 'resendingLimit', 
                value: 5
            }),
        ]
    });
};
