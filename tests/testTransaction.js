const assert = require('assert');
const starkbank = require('../index.js');
const generateExampleTransactionsJson = require('./utils/transaction.js').generateExampleTransactionsJson;

starkbank.user = require('./utils/user').exampleProject;

describe('TestTransactionPost', () => {
    it('test_success', async () => {
        let transfers = generateExampleTransactionsJson(1);
        transfers = await starkbank.transaction.create(transfers);
        for (let transfer of transfers) {
            assert(typeof transfer.id == 'string');
        }
    });
});

describe('TestTransactionGet', () => {
    it('test_success', async () => {
        let i = 0;
        const transfers = await starkbank.transaction.query({limit: 150});
        for await (let transfer of transfers) {
            assert(typeof transfer.id == 'string');
            i += 1;
        }
        assert(i === 150);
        console.log('Number of Transactions:', i);
    });
});

describe('TestTransactionInfoGet', () => {
    it('test_success', async () => {
        let transfers = await starkbank.transaction.query({limit: 1});
        for await (let transfer of transfers) {
            assert(typeof transfer.id == 'string');
            transfer = await starkbank.transaction.get(transfer.id);
            assert(typeof transfer.id == 'string');
        }
    });
});
