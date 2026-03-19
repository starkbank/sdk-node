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
        let i = 0;
        let limit = 3;
        let holderId = "0123456789012345";
        let merchantSessions = await starkbank.merchantSession.query({limit: limit, holderId: holderId});
        for await (let merchantSession of merchantSessions) {
            assert(merchantSession.holderId == holderId);
            assert(typeof merchantSession.id == 'string');
            i += 1;
        }
        assert(i == limit);
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
        let limit = 5;
        let holderId = "0123456789012345";
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.merchantSession.page({ limit: limit, holderId: holderId, cursor: cursor });
            for (let entity of page) {
                assert(entity.holderId == holderId);
                assert(!ids.includes(entity.id));
                ids.push(entity.id);
            }
            if (cursor == null) {
                break;
            }
        }
        assert(ids.length > limit);
    });
});

describe('MerchantSessionPurchase', function(){
    this.timeout(10000);
    it('test_success', async () => {

        let merchantSession = await starkbank.merchantSession.create(generateExampleMerchantSessionJson());
        let merchantSessionPurchase = await starkbank.merchantSession.purchase(
            merchantSession.uuid,
            generateExampleMerchantSessionPurchaseJson(),
        );
        assert(merchantSessionPurchase.id != null)
    });
});
