///<reference types="../types/" />
import starkbank from "starkbank";
import assert from 'assert';
const generateExampleDarfPaymentsJson = require('./utils/taxPayment').generateExampleDarfPaymentsJson;

starkbank.user = require('./utils/user').exampleProject;


describe('TestDarfPaymentPost', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let payments = await generateExampleDarfPaymentsJson(5);
        payments = await starkbank.darfPayment.create(payments);
        for (let payment of payments) {
            assert(typeof payment.id == 'string');
        }
    });
});

describe('TestDarfPaymentGetPage', function () {
    jest.setTimeout(10000);
    it('test_success', async () => {
        let ids: string[] = [];
        let cursor: string | null = null;
        let page: starkbank.DarfPayment[] | null = null;    
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.darfPayment.page({ limit: 5, cursor: cursor });
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

describe('TestDarfPaymentGet', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let i = 0;
        const payments = await starkbank.darfPayment.query({limit: 5});
        for await (let payment of payments) {
            assert(typeof payment.id == 'string');
            i += 1;
        }
        assert(i === 5);
    });
});

describe('TestDarfPaymentPdfGet', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let payments = await starkbank.darfPayment.query({limit: 1, status: 'processing'});
        for await (let payment of payments) {
            assert(typeof payment.id == 'string');
            let pdf = await starkbank.darfPayment.pdf(payment.id);
            assert(Buffer.isBuffer(pdf));
        }
    });
});

describe('TestDarfPaymentPostAndDelete', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let payments = await generateExampleDarfPaymentsJson(1, true);
        payments = await starkbank.darfPayment.create(payments);
        let payment = payments[0];
        assert(typeof payment.id == 'string');
        payment = await starkbank.darfPayment.delete(payment.id);
        assert(typeof payment.id == 'string');
    });
});
