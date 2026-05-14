import starkbank from 'starkbank';
const random = require('./random.js');
const uniqueId = require('./uniqueId.js').uniqueId;


let choice = function (a: number | null | string, b: string) {
    let rand = random.randomInt(0,1);
    if (rand == 0) {
        return a;
    }
    return b;
}


exports.generateExampleTransfersJson = function (n: number, amount = null, tomorrow = false) {

    let exampleTransfer: any = {
        amount: 10,
        name: 'João da Silva',
        taxId: '01234567890',
        bankCode: '18236120',
        branchCode: '0001',
        accountNumber: '10000-0',
        accountType: 'checking',
        description: choice(null, 'Test description') as string,
        externalId: "",
        rules: [
            new starkbank.transfer.Rule({
                key: 'resendingLimit',
                value: 5
            })
        ]
    };

    let transfers: starkbank.Transfer[] = [];

    let scheduled: string | null = null;
    if (tomorrow) {
        let scheduledDate = new Date();
        scheduledDate.setDate(scheduledDate.getDate() + 1);
        scheduled = choice(scheduledDate.toISOString().substring(0, 10), scheduledDate.toISOString().replace('Z','+00:00')) as string;
    }

    for (let i = 0; i < n; i++) {
        let transferAmount = Math.floor(amount as unknown as number);
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
