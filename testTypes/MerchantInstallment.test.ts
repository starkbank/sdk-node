///<reference types="../types/" />
import starkbank from "starkbank";
import assert from 'assert';

starkbank.user = require('./utils/user').exampleProject;

describe('TestMerchantInstallmentGet', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let i = 0;
        const installments = await starkbank.merchantInstallment.query({limit: 1});
        for await (let installment of installments) {
            installment = await starkbank.merchantInstallment.get(installment.id);
            assert(typeof installment.id == 'string');
        }
    });
});

describe('TestMerchantInstallmentGetQuery', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let i = 0;
        const installments = await starkbank.merchantInstallment.query({limit: 5});
        for await (let installment of installments) {
            assert(typeof installment.id == 'string');
            i += 1;
        }
        assert(i === 5);
    });
});

describe('TestMerchantInstallmentGetPage', function () {
    jest.setTimeout(10000);
    it('test_success', async () => {
        let ids: string[] = [];
        let cursor: string | null = null;
        let page: starkbank.MerchantInstallment[] | null = null;    
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