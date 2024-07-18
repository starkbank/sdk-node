const assert = require('assert');
const starkbank = require('../index.js');
const generateExampleMerchantSessionJson = require('./utils/merchantSession.js').generateExampleMerchantSessionJson;
const generateExampleMerchantSessionPurchaseJson = require('./utils/merchantSession.js').generateExampleMerchantSessionPurchaseJson

starkbank.user = require('./utils/user').exampleProject;

describe('MerchantSessionCreate', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let merchantSessionJson = generateExampleMerchantSessionJson()

        let merchantSession = await starkbank.merchantSession.create(merchantSessionJson);
        assert(merchantSession.id != null)
    });
});

describe('MerchantSessionQuery', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let merchantSessions = await starkbank.merchantSession.query({limit: 3});
        for await (let merchantSession of merchantSessions) {
            assert(typeof merchantSession.id == 'string');
        }
    });
});

describe('MerchantSessionGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let merchantSessions = await starkbank.merchantSession.query({limit: 3});
        for await (let session of merchantSessions) {
            let merchantSession = await starkbank.merchantSession.get(session.id);
            assert(typeof merchantSession.id == 'string');
        }
    });
});

describe('MerchantSessionPage', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let ids = [];
        let cursor = null;
        let page = null;
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.merchantSession.page({ limit: 5, cursor: cursor });
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

describe('MerchantSessionPurchase', function(){
    this.timeout(10000);
    it('test_success', async () => {

        let merchantSession = await starkbank.merchantSession.create(generateExampleMerchantSessionJson());

        let merchantSessionUuid = merchantSession.uuid

        let merchantSessionPuchaseJson = generateExampleMerchantSessionPurchaseJson(merchantSessionUuid)

        let merchantSessionPurchase = await starkbank.merchantSession.purchase(merchantSessionPuchaseJson);
        assert(merchantSessionPurchase.id != null)
    });
});
