const assert = require('assert');
const starkbank = require('../index.js');
const randomInt = require('./utils/random.js');

starkbank.user = require('./utils/user').exampleProject;

describe('TestCorporateHolderCreate', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let holders = await starkbank.corporateHolder.create(
            [
                new starkbank.CorporateHolder({
                    name: "Test - " + randomInt.randomInt(100000, 1000000),
                    permissions: [
                        new starkbank.corporateHolder.Permission({'ownerId': process.env.SANDBOX_ID, 'ownerType': 'project'})
                    ]
                })
            ]
        );

        let holderId = holders[0].id
        let holderName = "UpdatedName " + String(randomInt.randomInt(100000, 1000000))
        let holder = await starkbank.corporateHolder.update(holderId, {"name": holderName})
        assert(holderName == holder.name)
        holder = await starkbank.corporateHolder.cancel(holderId)
        assert("canceled" == holder.status)
    });
});

describe('TestCorporateHolderQuery', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let i = 0;
        const holders = await starkbank.corporateHolder.query({limit: 5});
        for await (let holder of holders) {
            assert(typeof holder.id == 'string');
            i += 1;
        }
        assert(i === 5);
    });
});

describe('TestCorporateHolderGet', function () {
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

describe('TestCorporateHolderPage', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let ids = [];
        let cursor = null;
        let page = null;
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.corporateHolder.page({ limit: 5, cursor: cursor });
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
