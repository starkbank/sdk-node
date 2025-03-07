const assert = require('assert');
const starkbank = require('../index.js');

starkbank.user = require('./utils/user').exampleProject;

describe('MerchantInstallmentQuery', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let merchantInstallments = await starkbank.merchantInstallment.query({limit: 3});
        for await (let merchantInstallment of merchantInstallments) {
            assert(typeof merchantInstallment.id == 'string');
        }
    });
});

describe('MerchantInstallmentGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let merchantInstallments = await starkbank.merchantInstallment.query({limit: 3});
        for await (let installment of merchantInstallments) {
            let merchantInstallment = await starkbank.merchantInstallment.get(installment.id);
            assert(typeof merchantInstallment.id == 'string');
        }
    });
});

describe('MerchantInstallmentPage', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let ids = [];
        let cursor = null;
        let page = null;
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.merchantInstallment.page({ limit: 5, cursor: cursor });
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