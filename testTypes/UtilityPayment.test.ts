///<reference types="../types/" />
import starkbank from "starkbank";
import assert from 'assert';
const generateExampleUtilityPaymentsJson = require('./utils/utilityPayment').generateExampleUtilityPaymentsJson;

starkbank.user = require('./utils/user').exampleProject;

describe('TestUtilityPaymentGet', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let i = 0;
        const payments = await starkbank.utilityPayment.query({limit: 5});
        for await (let payment of payments) {
            assert(typeof payment.id == 'string');
            i += 1;
        }
        assert(i === 5);
    });
});

describe('TestUtilityPaymentPostAndDelete', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let payments = await generateExampleUtilityPaymentsJson(1);
        payments = await starkbank.utilityPayment.create(payments);
        let payment = payments[0];
        assert(typeof payment.id == 'string');
        payment = await starkbank.utilityPayment.query({status: 'success'});
        payment = await starkbank.utilityPayment.delete(payment.id);
        assert(typeof payment.id == 'string');
    });
});

describe('TestUtilityPaymentInfoGet', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let payments = await starkbank.utilityPayment.query({limit: 1});
        for await (let payment of payments) {
            assert(typeof payment.id == 'string');
            payment = await starkbank.utilityPayment.get(payment.id);
            assert(typeof payment.id == 'string');
        }
    });
});

describe('TestUtilityPaymentPdfGet', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let payments = await starkbank.utilityPayment.query({limit: 1, status: 'processing'});
        for await (let payment of payments) {
            assert(typeof payment.id == 'string');
            let pdf = await starkbank.utilityPayment.pdf(payment.id);
            assert(Buffer.isBuffer(pdf));
        }
    });
});

describe('TestUtilityPaymentGetPage', function () {
    jest.setTimeout(10000);
    it('test_success', async () => {
        let ids: string[] = [];
        let cursor: string | null = null;
        let page: starkbank.UtilityPayment[] | null = null;    
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.utilityPayment.page({ limit: 5, cursor: cursor });
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
