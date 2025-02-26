const assert = require('assert');
const starkbank = require('../index.js');
const generateExampleMerchantSessionJson = require('./utils/merchantSession.js').generateExampleMerchantSessionJson;
const generateExampleMerchantSessionPurchaseJson = require('./utils/merchantSession.js').generateExampleMerchantSessionPurchaseJson

starkbank.user = require('./utils/user').exampleProject;

describe('MerchantPurchaseCreate', function(){
    this.timeout(10000);
    it('test_success', async () => {

        let merchantSession = await starkbank.merchantSession.create({
            "allowedFundingTypes": [
                "credit"
            ],
            "allowedInstallments": [
                {
                    "totalAmount": 1000,
                    "count": 1
                }
            ],
            "expiration": 3600,
            "challengeMode": "disabled",
            "tags": [
                "yourTags"
            ]
        });

        let merchantSessionPurchase = await starkbank.merchantSession.purchase({
            uuid: merchantSession.uuid,
            "amount": 1000,
            "cardExpiration": "2035-01",
            "cardNumber": "36490101441625",
            "cardSecurityCode": "123",
            "holderName": "Margaery Tyrell",
            "fundingType": "credit"
        });

        let merchantPurchase = await starkbank.merchantPurchase.create({
            amount: 1000,
            fundingType: 'credit',
            challengeMode: 'disabled',
            cardId: merchantSessionPurchase.cardId,
        });
        assert(typeof merchantPurchase.id == 'string');
    });
});

describe('MerchantPurchaseQuery', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let merchantPurchases = await starkbank.merchantPurchase.query({limit: 3});
        for await (let merchantPurchase of merchantPurchases) {
            assert(typeof merchantPurchase.id == 'string');
        }
    });
});

describe('MerchantPurchaseGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let merchantPurchases = await starkbank.merchantPurchase.query({limit: 3});
        for await (let purchase of merchantPurchases) {
            let merchantPurchase = await starkbank.merchantPurchase.get(purchase.id);
            assert(typeof merchantPurchase.id == 'string');
        }
    });
});

describe('MerchantPurchasePage', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let ids = [];
        let cursor = null;
        let page = null;
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.merchantPurchase.page({ limit: 5, cursor: cursor });
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

describe('MerchantPurchaseUpdate', function(){
    this.timeout(10000);
    it('test_success', async () => {

        let merchantSession = await starkbank.merchantSession.create({
            "allowedFundingTypes": [
                "credit"
            ],
            "allowedInstallments": [
                {
                    "totalAmount": 1000,
                    "count": 1
                }
            ],
            "expiration": 3600,
            "challengeMode": "disabled",
            "tags": [
                "yourTags"
            ]
        });

        let merchantPurchase = await starkbank.merchantSession.purchase({
            uuid: merchantSession.uuid,
            "amount": 1000,
            "cardExpiration": "2035-01",
            "cardNumber": "36490101441625",
            "cardSecurityCode": "123",
            "holderName": "Margaery Tyrell",
            "fundingType": "credit"
        });

        let updatedMerchantPurchase = await starkbank.merchantPurchase.update(merchantPurchase.id, {
            amount: 0,
            status: "canceled"
        });
        assert(updatedMerchantPurchase.id == merchantPurchase.id);
    });
})