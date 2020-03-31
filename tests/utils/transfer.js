const starkbank = require('../../starkbank');

var defaultExampleTransfer = new starkbank.Transfer({
    amount: 10,
    name: "João da Silva",
    taxId: "01234567890",
    bankCode: "01",
    branchCode: "0001",
    accountNumber: "10000-0",
});

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


exports.generateExampleTransfersJson = function (n, amount = null) {
    let transfers = [];
    let exampleTransfer = JSON.parse(JSON.stringify(defaultExampleTransfer));
    for (let i = 0; i < n; i++) {
        let transferAmount = Math.floor(amount);
        if (!amount) {
            transferAmount = randomInt(5, 1000);
        }
        exampleTransfer.name = 'Jon Snow'; //TODO random name generator
        exampleTransfer.amount = transferAmount;
        exampleTransfer.taxId = '012.345.678-90'; // TODO taxId generator
        transfers.push(Object.assign(new starkbank.Transfer({}), JSON.parse(JSON.stringify(exampleTransfer))));
    }
    return transfers;
};
