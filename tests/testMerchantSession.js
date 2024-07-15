const assert = require('assert');
const starkbank = require('../index.js');
const generateExampleMerchantSessionJson = require('./utils/merchantSession.js').generateExampleMerchantSessionJson;
const generateExampleMerchantSessionPurchaseJson = require('./utils/merchantSession.js').generateExampleMerchantSessionPurchaseJson

starkbank.user = require('./utils/user').exampleProject;

describe('MerchantSession', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let merchantSessionJson = generateExampleMerchantSessionJson()

        let merchantSession = await starkbank.merchantSession.create(merchantSessionJson);
        assert(merchantSession.id != null)
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
