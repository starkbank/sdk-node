const starkbank = require('../../starkbank');
const random = require('./random.js');

var defaultExampleTransfer = new starkbank.Transfer({
    amount: 10,
    name: 'João da Silva',
    taxId: '01234567890',
    bankCode: '01',
    branchCode: '0001',
    accountNumber: '10000-0',
});

exports.generateExampleTransfersJson = function (n, amount = null) {
    let transfers = [];
    let exampleTransfer = JSON.parse(JSON.stringify(defaultExampleTransfer));
    for (let i = 0; i < n; i++) {
        let transferAmount = Math.floor(amount);
        if (!amount) {
            transferAmount = random.randomInt(5, 1000);
        }
        exampleTransfer.name = 'Jon Snow';
        exampleTransfer.amount = transferAmount;
        exampleTransfer.taxId = '012.345.678-90';
        transfers.push(Object.assign(new starkbank.Transfer({}), JSON.parse(JSON.stringify(exampleTransfer))));
    }
    return transfers;
};
