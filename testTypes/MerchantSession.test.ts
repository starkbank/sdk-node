///<reference types="../types/" />
import starkbank from "starkbank";
import assert from 'assert';
const generateExampleMerchantSessionJson = require('./utils/merchantSession.js').generateExampleMerchantSessionJson;
const generateExampleMerchantSessionPurchaseJson = require('./utils/merchantSession.js').generateExampleMerchantSessionPurchaseJson

starkbank.user = require('./utils/user').exampleProject;

describe('TestMerchantSessionCreate', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let merchantSessionJson = generateExampleMerchantSessionJson()

        let merchantSession = await starkbank.merchantSession.create(merchantSessionJson);

        assert(typeof merchantSession.id == 'string')
    });
});

describe('TestMerchantSessionPurchaseCreate', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {

        let sessionJson = {
            allowedFundingTypes: [
                "debit",
                "credit"
            ],
            allowedInstallments: [
                {
                    "totalAmount": 0,
                    "count": 1
                },
                {
                    "totalAmount": 120,
                    "count": 2
                },
                {
                    "totalAmount": 180,
                    "count": 12
                }
            ],
            expiration: 3600,
            challengeMode: "disabled",
            tags: [
                "yourTags"
            ]
        }

        let merchantSession = await starkbank.merchantSession.create(sessionJson);

        let purchaseJson = {
            amount: 180,
            cardExpiration: "2035-01",
            cardNumber: "5277696455399733",
            cardSecurityCode: "123",
            holderName: "Holder Name",
            fundingType: "credit",
            holderEmail: "holdeName@email.com",
            holderPhone: "11111111111",
            billingCountryCode: "BRA",
            billingCity: "São Paulo",
            billingStateCode: "SP",
            billingStreetLine1: "Rua do Holder Name, 123",
            billingStreetLine2: "",
            billingZipCode: "11111-111",
            metadata: {
                "userAgent": "Postman",
                "userIp": "255.255.255.255",
                "language": "pt-BR",
                "timezoneOffset": 3,
                "extraData": "extraData"
            },
            installmentCount: 12
        }

        let merchantSessionPurchase = await starkbank.merchantSession.purchase(merchantSession.uuid, purchaseJson);

        assert(typeof merchantSessionPurchase.id == 'string')
    });
});

describe('TestMerchantSessionGet', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let i = 0;
        const sessions = await starkbank.merchantSession.query({limit: 1});
        for await (let session of sessions) {
            session = await starkbank.merchantSession.get(session.id);
            assert(typeof session.id == 'string');
        }
    });
});

describe('TestMerchantSessionGetQuery', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let i = 0;
        const sessions = await starkbank.merchantSession.query({limit: 5});
        for await (let session of sessions) {
            assert(typeof session.id == 'string');
            i += 1;
        }
        assert(i === 5);
    });
});

describe('TestMerchantSessionGetPage', function () {
    jest.setTimeout(10000);
    it('test_success', async () => {
        let ids: string[] = [];
        let cursor: string | null = null;
        let page: starkbank.MerchantSession[] | null = null;    
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