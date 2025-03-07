///<reference types="../types/" />
import starkbank from "starkbank";
import assert from 'assert';
const generateExampleMerchantSessionJson = require('./utils/merchantSession.js').generateExampleMerchantSessionJson;
const generateExampleMerchantSessionPurchaseJson = require('./utils/merchantSession.js').generateExampleMerchantSessionPurchaseJson

starkbank.user = require('./utils/user').exampleProject;

describe('TestMerchantSessionLogGet', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let i = 0;
        const sessions = await starkbank.merchantSession.log.query({limit: 1});
        for await (let session of sessions) {
            session = await starkbank.merchantSession.log.get(session.id);
            assert(typeof session.id == 'string');
        }
    });
});

describe('TestMerchantSessionGetLogQuery', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let i = 0;
        const sessions = await starkbank.merchantSession.log.query({limit: 5});
        for await (let session of sessions) {
            assert(typeof session.id == 'string');
            i += 1;
        }
        assert(i === 5);
    });
});

describe('TestMerchantSessionGetLogPage', function () {
    jest.setTimeout(10000);
    it('test_success', async () => {
        let ids: string[] = [];
        let cursor: string | null = null;
        let page: starkbank.merchantSession.Log[] | null = null;    
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.merchantSession.log.page({ limit: 5, cursor: cursor });
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
