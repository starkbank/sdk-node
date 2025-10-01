const assert = require('assert');
const starkbank = require('../index.js');
const starkcore = require("../node_modules/starkcore/starkcore/error.js");

starkbank.user = require('./utils/user').exampleProject;

describe('TestCorporatePurchaseQuery', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let i = 0;
        const purchases = await starkbank.corporatePurchase.query({limit: 5});
        for await (let purchase of purchases) {
            assert(typeof purchase.id == 'string');
            i += 1;
        }
        assert(i === 5);
    });
});

describe('TestCorporatePurchaseGet', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let purchases = await starkbank.corporatePurchase.query({ limit: 1 });
        for await (let purchase of purchases) {
            assert(typeof purchase.id == typeof 'string');
            brcode = await starkbank.corporatePurchase.get(purchase.id);
            assert(typeof purchase.id == typeof 'string');
        }
    });
});


describe('TestCorporatePurchasePage', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let ids = [];
        let cursor = null;
        let page = null;
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.corporatePurchase.page({ limit: 5, cursor: cursor });
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


describe('TestCorporatePurchaseParseRight', function(){
    this.timeout(10000);
    it('test_valid_signature', async () => {
        content = '{"acquirerId": "236090", "amount": 100, "cardId": "5671893688385536", "cardTags": [], "endToEndId": "2fa7ef9f-b889-4bae-ac02-16749c04a3b6", "holderId": "5917814565109760", "holderTags": [], "isPartialAllowed": false, "issuerAmount": 100, "issuerCurrencyCode": "BRL", "merchantAmount": 100, "merchantCategoryCode": "bookStores", "merchantCountryCode": "BRA", "merchantCurrencyCode": "BRL", "merchantFee": 0, "merchantId": "204933612653639", "merchantName": "COMPANY 123", "methodCode": "token", "purpose": "purchase", "score": null, "tax": 0, "walletId": ""}'
        valid_signature = "MEUCIBxymWEpit50lDqFKFHYOgyyqvE5kiHERi0ZM6cJpcvmAiEA2wwIkxcsuexh9BjcyAbZxprpRUyjcZJ2vBAjdd7o28Q="
        let corporatePurchase = await starkbank.corporatePurchase.parse(content, valid_signature);
        assert(corporatePurchase instanceof starkbank.CorporatePurchase)
        
    });

    it('test_malformed_signature', async () => {
        content = '{"acquirerId": "236090", "amount": 100, "cardId": "5671893688385536", "cardTags": [], "endToEndId": "2fa7ef9f-b889-4bae-ac02-16749c04a3b6", "holderId": "5917814565109760", "holderTags": [], "isPartialAllowed": false, "issuerAmount": 100, "issuerCurrencyCode": "BRL", "merchantAmount": 100, "merchantCategoryCode": "bookStores", "merchantCountryCode": "BRA", "merchantCurrencyCode": "BRL", "merchantFee": 0, "merchantId": "204933612653639", "merchantName": "COMPANY 123", "methodCode": "token", "purpose": "purchase", "score": null, "tax": 0, "walletId": ""}'
        malformed_signature = "MEUCIBxymWEpit50lDqFKFHYOgyyqvE5kiHERi0ZM6cJpcvmAiEA2wwIkxcsuexh9BjcyAbZxprpRUyjcZJ2vBAjdd7o29Q="

        try {
            await starkbank.corporatePurchase.parse({
                content: content,
                signature: malformed_signature
            });
            throw new Error('Oops, signature was accepted!');
        } catch (e) {
            assert(e instanceof starkcore.InvalidSignatureError);
        }
    });
});
