///<reference types="../types/" />
import starkbank from "starkbank";
import assert from 'assert';
const generateExampleTransfersJson = require('./utils/transfer.js').generateExampleTransfersJson;

starkbank.user = require('./utils/user').exampleProject;

describe('TestTransferPost', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let transfers = generateExampleTransfersJson(5, null, true);
        transfers = await starkbank.transfer.create(transfers);
        for (let transfer of transfers) {
            assert(typeof transfer.id == 'string');
        }
    });
});

describe('TestTransferGet', function(){
    jest.setTimeout(10000);
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
    jest.setTimeout(10000);
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
        let transfersIdsExpected: string[] = [];
        for await (let transfer of transfers) {
            transfersIdsExpected.push(transfer.id);
        }

        let transfersResult = await starkbank.transfer.query({ids: transfersIdsExpected});
        let transfersIdsResult: string[] = [];
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
    jest.setTimeout(10000);
    it('test_success', async () => {
        let transfers = generateExampleTransfersJson(1, null, true);
        transfers = await starkbank.transfer.create(transfers);
        let transfer = await starkbank.transfer.delete(transfers[0].id);
        assert(transfer.status == 'canceled');
    });
});

describe('TestTransferPdfGet', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let transfers = await starkbank.transfer.query({limit: 1, status: 'processing'});
        for await (let transfer of transfers) {
            assert(typeof transfer.id == 'string');
            let pdf = await starkbank.transfer.pdf(transfer.id);
            assert(Buffer.isBuffer(pdf));
        }
    });
});

describe('TestTransferGetPage', function () {
    jest.setTimeout(10000);
    it('test_success', async () => {
        let ids: string[] = [];
        let cursor: string | null = null;
        let page: starkbank.Transfer[] | null = null;    
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.transfer.page({ limit: 5, cursor: cursor });
            for (let entity of page) {
                assert(!ids.includes(entity.id));
                ids.push(entity.id);
            }
            if (cursor == null) {
                break;
            }
        }
        assert(ids.length == 10);
    });
});
