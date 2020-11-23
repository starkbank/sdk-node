const assert = require('assert');
const starkbank = require('../index.js');
const generateExampleTransfersJson = require('./utils/transfer.js').generateExampleTransfersJson;

starkbank.user = require('./utils/user').exampleProject;

describe('TestTransferPost', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let transfers = generateExampleTransfersJson(5, null, true);
        transfers = await starkbank.transfer.create(transfers);
        for (let transfer of transfers) {
            assert(typeof transfer.id == 'string');
        }
    });
});

describe('TestTransferGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let i = 0;
        const transfers = await starkbank.transfer.query({limit: 150});
        for await (let transfer of transfers) {
            assert(typeof transfer.id == 'string');
            i += 1;
        }
        assert(i === 150);
    });
});

describe('TestTransferInfoGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let transfers = await starkbank.transfer.query({limit: 1});
        for await (let transfer of transfers) {
            assert(typeof transfer.id == 'string');
            transfer = await starkbank.transfer.get(transfer.id);
            assert(typeof transfer.id == 'string');
        }
    });

    it('test_success_ids', async () => {
        let transfers = await starkbank.transfer.query({limit: 10});
        let transfersIdsExpected = [];
        for await (let transfer of transfers) {
            transfersIdsExpected.push(transfer.id);
        }

        let transfersResult = await starkbank.transfer.query({ids: transfersIdsExpected});
        let transfersIdsResult = [];
        for await (let transfer of transfersResult){
            transfersIdsResult.push(transfer.id);
        }
        
        transfersIdsExpected.sort();
        transfersIdsResult.sort();
        assert(transfersIdsExpected.length == transfersIdsResult.length);
        for (let i=0; i<transfersIdsExpected.length; i++){
            assert(transfersIdsExpected[i] === transfersIdsResult[i]);
        }
    });
});

describe('TestTransferDelete', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let transfers = generateExampleTransfersJson(1, null, true);
        transfers = await starkbank.transfer.create(transfers);
        transfer = await starkbank.transfer.delete(transfers[0].id);
        assert(transfer.status == 'canceled');
    });
});

describe('TestTransferPdfGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let transfers = await starkbank.transfer.query({limit: 1, status: 'processing'});
        for await (let transfer of transfers) {
            assert(typeof transfer.id == 'string');
            let pdf = await starkbank.transfer.pdf(transfer.id);
            assert(Buffer.isBuffer(pdf));
        }
    });
});
