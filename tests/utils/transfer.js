const starkbank = require('../../index.js');
const random = require('./random.js');

exports.generateExampleTransfersJson = function (n, amount = null, tomorrow = false) {
    
    let exampleTransfer = {
        amount: 10,
        name: 'João da Silva',
        taxId: '01234567890',
        bankCode: '01',
        branchCode: '0001',
        accountNumber: '10000-0',
    };

    let transfers = [];
    
    let scheduled = null;
    if (tomorrow) {
        scheduled = new Date();
        scheduled.setDate(scheduled.getDate() + 1);
        scheduled = scheduled.toISOString().substring(0, 10);
    }

    for (let i = 0; i < n; i++) {
        let transferAmount = Math.floor(amount);
        if (!amount) {
            transferAmount = random.randomInt(5, 1000);
        }
        exampleTransfer.name = 'Jon Snow';
        exampleTransfer.amount = transferAmount;
        exampleTransfer.taxId = '012.345.678-90';
        exampleTransfer.scheduled = scheduled;
        transfers.push(new starkbank.Transfer(exampleTransfer));
    }
    return transfers;
};
