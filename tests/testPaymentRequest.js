const assert = require('assert');
const starkbank = require('../index.js');
const generatePaymentRequestExamplesJson = require('./utils/paymentRequest').generateExamplePaymentRequestJson;

starkbank.user = require('./utils/user').exampleProject;

describe('TestPaymentRequestPostTransfer', function(){
    this.timeout(30000);
    it('test_success', async () => {
        let requests = await generatePaymentRequestExamplesJson(1, ['transfer']);
        requests = await starkbank.paymentRequest.create(requests);
        for (let request of requests) {
            assert(typeof request.id == 'string');
        }
    });
});

describe('TestPaymentRequestPostTransaction', function(){
    this.timeout(30000);
    it('test_success', async () => {
        let requests = await generatePaymentRequestExamplesJson(1, ['transaction']);
        requests = await starkbank.paymentRequest.create(requests);
        for (let request of requests) {
            assert(typeof request.id == 'string');
        }
    });
});

describe('TestPaymentRequestPostBoletoPayment', function(){
    this.timeout(30000);
    it('test_success', async () => {
        let requests = await generatePaymentRequestExamplesJson(1, ['boleto-payment']);
        requests = await starkbank.paymentRequest.create(requests);
        for (let request of requests) {
            assert(typeof request.id == 'string');
        }
    });
});

describe('TestPaymentRequestPostUtilityPayment', function(){
    this.timeout(30000);
    it('test_success', async () => {
        let requests = await generatePaymentRequestExamplesJson(1, ['utility-payment']);
        requests = await starkbank.paymentRequest.create(requests);
        for (let request of requests) {
            assert(typeof request.id == 'string');
        }
    });
});

describe('TestPaymentRequestPostBrcodePayment', function(){
    this.timeout(30000);
    it('test_success', async () => {
        let requests = await generatePaymentRequestExamplesJson(1, ['brcode-payment']);
        requests = await starkbank.paymentRequest.create(requests);
        for (let request of requests) {
            assert(typeof request.id == 'string');
        }
    });
});

describe('TestPaymentRequestPostTaxPayment', function(){
    this.timeout(30000);
    it('test_success', async () => {
        let requests = await generatePaymentRequestExamplesJson(1, ['tax-payment']);
        requests = await starkbank.paymentRequest.create(requests);
        for (let request of requests) {
            assert(typeof request.id == 'string');
        }
    });
});

describe('TestPaymentRequestPostDarfPayment', function(){
    this.timeout(30000);
    it('test_success', async () => {
        let requests = await generatePaymentRequestExamplesJson(1, ['darf-payment']);
        requests = await starkbank.paymentRequest.create(requests);
        for (let request of requests) {
            assert(typeof request.id == 'string');
        }
    });
});

describe('TestPaymentRequestGet', function () {
    this.timeout(30000);
    it('test_success', async () => {
        let i = 0;
        const requests = await starkbank.paymentRequest.query({ centerId: process.env.SANDBOX_CENTER_ID, limit: 150 });
        for await (let request of requests) {
            assert(typeof request.id == 'string');
            i += 1;
        }
        assert(i === 150);
    });
});

describe('TestPaymentRequestGetPage', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let ids = [];
        let cursor = null;
        let page = null;
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.paymentRequest.page({ limit: 5, cursor: cursor, centerId: process.env.SANDBOX_CENTER_ID});
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
