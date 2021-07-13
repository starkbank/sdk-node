const starkbank = require('../../index.js');
const random = require('./random.js');
const uniqueId = require('./uniqueId.js').uniqueId;


let choice = function (a, b) {
    let rand = random.randomInt(0,1);
    if (rand == 0) {
        return a;
    }
    return b;
}


exports.generateExampleTransfersJson = function (n, amount = null, tomorrow = false) {
    
    let exampleTransfer = {
        amount: 10,
        name: 'João da Silva',
        taxId: '01234567890',
        bankCode: '18236120',
        branchCode: '0001',
        accountNumber: '10000-0',
        accountType: 'checking',
        description: choice(null, 'Test description')
    };

    let transfers = [];
    
    let scheduled = null;
    if (tomorrow) {
        scheduled = new Date();
        scheduled.setDate(scheduled.getDate() + 1);
        scheduled = choice(scheduled.toISOString().substring(0, 10), scheduled.toISOString().replace('Z','+00:00'));
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
        exampleTransfer.externalId = 'node-' + uniqueId();
        transfers.push(new starkbank.Transfer(exampleTransfer));
    }
    return transfers;
};
