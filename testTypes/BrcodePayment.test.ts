///<reference types="../types/" />
import starkbank from "starkbank";
import assert from 'assert';
import { generateExampleBrcodePaymentsJson } from './utils/brcodePayment';

starkbank.user = require('./utils/user').exampleProject;

describe('TestBrcodePaymentPost', function () {
	jest.setTimeout(10000);
	it('test_success', async () => {
		let payments = await generateExampleBrcodePaymentsJson(5);
		payments = await starkbank.brcodePayment.create(payments);
		let i = 0;
		for await (let payment of payments) {
			assert(typeof payment.id == 'string');
			i += 1;
		}
		assert(i === 5);
	});
});

describe('TestBrcodePaymentGet', function () {
	jest.setTimeout(10000);
	it('test_success', async () => {
		let i = 0;
		const payments = await starkbank.brcodePayment.query({ limit: 5 });
		for await (let payment of payments) {
			assert(typeof payment.id == 'string');
			i += 1;
		}
		assert(i === 5);
	});
});

describe('TestBrcodePaymentInfoPatch', function () {
	jest.setTimeout(20000);
	it('test_success_cancel', async () => {
		let payments = await starkbank.brcodePayment.query({ limit: 1, status: 'created' });
		let i = 0;
		for await (let payment of payments) {
			assert(typeof payment.id == 'string');
			let updated_payment = await starkbank.brcodePayment.update(payment.id, { status: 'canceled' });
			assert(updated_payment.status == 'canceled');
			i += 1;
		}
		assert(i === 1);
	});
});

describe('TestBrcodePaymentPdfGet', function () {
	jest.setTimeout(20000);
	it('test_success', async () => {
		let payments = await starkbank.brcodePayment.query({ limit: 1, status: 'success' });
		for await (let payment of payments) {
			assert(typeof payment.id == 'string');
			let pdf = await starkbank.brcodePayment.pdf(payment.id);
			assert(Buffer.isBuffer(pdf));
		}
	});
});

describe('TestBrcodePaymentGetPage', function () {
	jest.setTimeout(10000);
	it('test_success', async () => {
		let ids: string[] = [];
		let cursor: string | null = null;
		let page: starkbank.BrcodePayment[] | null = null;
		for (let i = 0; i < 2; i++) {
			[page, cursor] = await starkbank.brcodePayment.page({ limit: 5, cursor: cursor });
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
