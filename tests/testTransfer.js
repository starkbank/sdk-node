const assert = require('assert');
const starkbank = require('../index.js');
const generateExampleTransfersJson = require('./utils/transfer.js').generateExampleTransfersJson;

starkbank.user = require('./utils/user').exampleProject;

describe('TestTransferPost', () => {
    it('test_success', async () => {
        let transfers = generateExampleTransfersJson(5);
        transfers = await starkbank.transfer.create(transfers);
        for (let transfer of transfers) {
            assert(typeof transfer.id == 'string');
        }
    });
});

describe('TestTransferGet', () => {
    it('test_success', async () => {
        let i = 0;
        const transfers = await starkbank.transfer.query({limit: 150});
        for await (let transfer of transfers) {
            assert(typeof transfer.id == 'string');
            i += 1;
        }
        assert(i === 150);
        console.log('Number of boletos:', i);
    });
});

describe('TestTransferInfoGet', () => {
    it('test_success', async () => {
        let transfers = await starkbank.transfer.query({limit: 1});
        for await (let transfer of transfers) {
            assert(typeof transfer.id == 'string');
            transfer = await starkbank.transfer.get(transfer.id);
            assert(typeof transfer.id == 'string');
        }
    });
});

describe('TestTransferPdfGet', () => {
    it('test_success', async () => {
        let transfers = await starkbank.transfer.query({limit: 1, status: 'processing'});
        for await (let transfer of transfers) {
            assert(typeof transfer.id == 'string');
            let pdf = await starkbank.transfer.pdf(transfer.id);
            assert(Buffer.isBuffer(pdf));
        }
    });
});
