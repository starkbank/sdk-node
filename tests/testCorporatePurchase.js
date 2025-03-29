const assert = require('assert');
const starkbank = require('../index.js');

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
            purchase = await starkbank.corporatePurchase.get(purchase.id);
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
        content = '{"event": {"created": "2024-06-07T23:19:39.606017+00:00", "id": "6447612198649856", "log": {"corporateTransactionId": "", "created": "2024-06-07T23:19:38.893018+00:00", "description": "Purchase updated.", "errors": [], "id": "5980114986729472", "purchase": {"amount": 8042502, "attachments": [], "cardEnding": null, "cardId": "5740780031311872", "centerId": "4830905268961280", "corporateTransactionIds": ["5999472605659136"], "created": "2024-06-03T15:00:19.018834+00:00", "description": null, "holderId": "6026968331976704", "holderName": null, "id": "6280947582369792", "issuerAmount": null, "issuerCurrencyCode": null, "issuerCurrencySymbol": null, "merchantAmount": null, "merchantCategoryCode": null, "merchantCategoryType": null, "merchantCountryCode": null, "merchantCurrencyCode": null, "merchantCurrencySymbol": null, "merchantDisplayName": "COMIDA NICE", "merchantDisplayUrl": "https://sandbox.api.starkbank.com/v2/corporate-icon/type/food.png", "merchantFee": null, "merchantName": "COMIDA NICE", "methodCode": null, "status": "confirmed", "tags": [], "tax": null, "updated": "2024-06-07T23:19:38.893086+00:00"}, "type": "updated"}, "subscription": "corporate-purchase", "workspaceId": "6341320293482496"}}'
        valid_signature = "MEUCIA4SMyl8sdTlB/oMZCJFQ1PuqP4UchFAiwdCvt1ZPGAPAiEArv7PE6fJGKODowfT1s2n+dJncsIOq9ZsSOpWt01lvUg="
        let event = await starkbank.event.parse({
            content: content,
            signature: valid_signature
        });
        assert(event instanceof starkbank.Event)
        
    });

    it('test_malformed_signature', async () => {
        content = '{"event": {"created": "2024-06-07T23:19:39.606017+00:00", "id": "6447612198649856", "log": {"corporateTransactionId": "", "created": "2024-06-07T23:19:38.893018+00:00", "description": "Purchase updated.", "errors": [], "id": "5980114986729472", "purchase": {"amount": 8042502, "attachments": [], "cardEnding": null, "cardId": "5740780031311872", "centerId": "4830905268961280", "corporateTransactionIds": ["5999472605659136"], "created": "2024-06-03T15:00:19.018834+00:00", "description": null, "holderId": "6026968331976704", "holderName": null, "id": "6280947582369792", "issuerAmount": null, "issuerCurrencyCode": null, "issuerCurrencySymbol": null, "merchantAmount": null, "merchantCategoryCode": null, "merchantCategoryType": null, "merchantCountryCode": null, "merchantCurrencyCode": null, "merchantCurrencySymbol": null, "merchantDisplayName": "COMIDA NICE", "merchantDisplayUrl": "https://sandbox.api.starkbank.com/v2/corporate-icon/type/food.png", "merchantFee": null, "merchantName": "COMIDA NICE", "methodCode": null, "status": "confirmed", "tags": [], "tax": null, "updated": "2024-06-07T23:19:38.893086+00:00"}, "type": "updated"}, "subscription": "corporate-purchase", "workspaceId": "6341320293482496"}}'
        malformed_signature = "MEUCIQDOpo1j+V40DNZK2URL2786UQK/8mDXon9ayEd8U0/l7AIgYXtIZJBTs8zCRR3vmted6Ehz/qfw1GRut/eYyvf1yOk=";

        try {
            await starkbank.event.parse({
                content: content,
                signature: malformed_signature
            });
            throw new Error('Oops, signature was accepted!');
        } catch (e) {
            if (!(e instanceof starkbank.error.InvalidSignatureError))
                throw e;
        }
    });
});
