///<reference types="../types/" />
import starkbank from "starkbank";
import assert from 'assert';

starkbank.user = require('./utils/user').exampleProject;

describe('TestMerchantPurchaseGet', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let i = 0;
        const purchases = await starkbank.merchantPurchase.query({limit: 1});
        for await (let purchase of purchases) {
            purchase = await starkbank.merchantPurchase.get(purchase.id);
            assert(typeof purchase.id == 'string');
        }
    });
});

describe('TestMerchantPurchaseGetQuery', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let i = 0;
        const purchases = await starkbank.merchantPurchase.query({limit: 5});
        for await (let purchase of purchases) {
            assert(typeof purchase.id == 'string');
            i += 1;
        }
        assert(i === 5);
    });
});

describe('TestMerchantPurchaseGetPage', function () {
    jest.setTimeout(10000);
    it('test_success', async () => {
        let ids: string[] = [];
        let cursor: string | null = null;
        let page: starkbank.MerchantPurchase[] | null = null;    
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

describe('TestMerchantPurchase', function () {
    jest.setTimeout(10000);
    it('test_success', async () => {
        let merchantSessionJson = {
            allowedFundingTypes: [
                "debit",
                "credit"
            ],
            allowedInstallments: [
                {
                    "count": 1,
                    "totalAmount": 5000
                },
                {
                    "count": 2,
                    "totalAmount": 5500
                }
            ],
            expiration: 3600,
            challengeMode: "disabled",
            tags: [
                "purchase_1234"
            ]
        }

        let merchantSession = await starkbank.merchantSession.create(merchantSessionJson);

        let merchantSessionPurchaseJson = {
            amount: 5000,
            installmentCount: 1,
            cardExpiration: "2035-01",
            cardNumber: "5448280000000007",
            cardSecurityCode: "123",
            holderName: "Rhaenyra Targaryen",
            holderEmail: "rhaenyra.targaryen@starkbank.com",
            holderPhone: "11985923451",
            fundingType: "credit",
            billingCountryCode: "BRA",
            billingCity: "Sao Paulo",
            billingStateCode: "SP",
            billingStreetLine1: "Av. Faria Lima, 1844",
            billingStreetLine2: "",
            billingZipCode: "01500-000",
            challengeMode: "disabled",
        }

        let merchantSessionPurchase = await starkbank.merchantSession.purchase(
            merchantSession.uuid,
            merchantSessionPurchaseJson,
        );

        let updatedMerchantPurchase = await starkbank.merchantPurchase.update(merchantSessionPurchase.id, {
            amount: 0,
            status: "canceled"
        });

        assert(updatedMerchantPurchase.id == merchantSessionPurchase.id);
    });
});
