const random = require('./random');
import starkbank from 'starkbank';

exports.generateExampleTransactionsJson = function (n = 1) {
    
    let exampleTransaction = {
        amount: 50,
        receiverId: '12345',
        externalId: 'unique identifier',
        description: 'Transaction to a random workspace'
    };
    
    let transactions: starkbank.Transaction[] = [];
    for (let i = 0; i < n; i++) {
        exampleTransaction.receiverId = '5768064935133184';
        exampleTransaction.amount = random.randomInt(1, 10);
        exampleTransaction.externalId = random.randomInt(1, 1.e16).toString();
        transactions.push(new starkbank.Transaction(exampleTransaction));
    }
    return transactions;
};
