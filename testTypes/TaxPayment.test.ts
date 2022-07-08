///<reference types="../types/" />
import starkbank from "starkbank";
import assert from 'assert';
import { generateExampleTaxPaymentsJson } from './utils/taxPayment';
const futureDate = require('./utils/random.js').futureDate;
const randomInt = require('./utils/random.js').randomInt;

starkbank.user = require('./utils/user').exampleProject;


describe('TestTaxPaymentPost', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let payments = await generateExampleTaxPaymentsJson(1, null ,true, true) as starkbank.TaxPayment[];
        payments = await starkbank.taxPayment.create(payments);
        for (let payment of payments) {
            assert(typeof payment.id == 'string');
        }
    });
});

describe('TestTaxPaymentGet', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let i = 0;
        const payments = await starkbank.taxPayment.query({limit: 5});
        for await (let payment of payments) {
            assert(typeof payment.id == 'string');
            i += 1;
        }
        assert(i === 5);
    });
});

describe('TestTaxPaymentPostAndDelete', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let payments = await generateExampleTaxPaymentsJson(1, null, true, true) as starkbank.TaxPayment[];
        payments = await starkbank.taxPayment.create(payments);
        let payment = payments[0];
        assert(typeof payment.id == 'string');
        payment = await starkbank.taxPayment.delete(payment.id);
        assert(typeof payment.id == 'string');
    });
});

describe('TestTaxPaymentInfoGet', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let payments = await starkbank.taxPayment.query({limit: 1});
        for await (let payment of payments) {
            assert(typeof payment.id == 'string');
            payment = await starkbank.taxPayment.get(payment.id);
            assert(typeof payment.id == 'string');
        }
    });
});

describe('TestTaxPaymentPdfGet', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let payments = await starkbank.taxPayment.query({limit: 1, status: 'processing'});
        for await (let payment of payments) {
            assert(typeof payment.id == 'string');
            let pdf = await starkbank.taxPayment.pdf(payment.id);
            assert(Buffer.isBuffer(pdf));
        }
    });
});

describe('TestTaxPaymentGetPage', function () {
    jest.setTimeout(10000);
    it('test_success', async () => {
        let ids: string[] = [];
        let cursor: string | null = null;
        let page: starkbank.TaxPayment[] | null = null;    
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.taxPayment.page({ limit: 5, cursor: cursor });
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
