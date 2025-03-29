const assert = require('assert');
const starkbank = require('../index.js');
const randomInt = require('./utils/random.js')

starkbank.user = require('./utils/user.js').exampleProject;


describe('TestCorporateWithdrawalCreate', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let methods = await starkbank.corporateWithdrawal.create(new starkbank.CorporateWithdrawal(
            {
            "amount": randomInt.randomInt(1000, 1000),
            "externalId": "Test - " + String(randomInt.randomInt(10000, 1000000)),
            }
        ))
    });
});

describe('TestCorporateWithdrawalQuery', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let i = 0;
        const withdrawals = await starkbank.corporateWithdrawal.query({limit: 5});
        for await (let withdrawal of withdrawals) {
            assert(typeof withdrawal.id == 'string');
            i += 1;
        }
        assert(i === 5);
    });
});

describe('TestCorporateTransactionPage', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let ids = [];
        let cursor = null;
        let page = null;
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.corporateWithdrawal.page({ limit: 5, cursor: cursor });
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

describe('TestCorporateTransactionGet', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let withdrawals = await starkbank.corporateWithdrawal.query({ limit: 1 });
        for await (let withdrawal of withdrawals) {
            assert(typeof withdrawal.id == typeof 'string');
            purchase = await starkbank.corporateWithdrawal.get(withdrawal.id);
            assert(typeof withdrawal.id == typeof 'string');
        }
    });
});
