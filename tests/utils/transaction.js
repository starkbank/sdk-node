const random = require('./random');
const starkbank = require('../../index.js');

defaultExampleTransaction = new starkbank.Transaction({
        amount: 50,
        receiverId: '12345',
        externalId: 'unique identifier',
        description: 'Transferencia para Workspace aleatorio'
    },
);


exports.generateExampleTransactionsJson = function (n = 1) {

    let transactions = [];
    let exampleTransaction = JSON.parse(JSON.stringify(defaultExampleTransaction));
    for (let i = 0; i < n; i++) {
        let transactionAmount = random.randomInt(1, 10);
        exampleTransaction.receiverId = '5768064935133184';
        exampleTransaction.amount = transactionAmount;
        exampleTransaction.externalId = 'Test ' + Date();
        transactions.push(Object.assign(new starkbank.Transfer({}), JSON.parse(JSON.stringify(exampleTransaction))));
    }
    return transactions;

};