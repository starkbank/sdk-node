const assert = require('assert');
const starkbank = require('../index.js');
const generateExampleBrcodePaymentsJson = require('./utils/brcodePayment.js').generateExampleBrcodePaymentsJson;

starkbank.user = require('./utils/user').exampleProject;

describe('TestBrcodePaymentPost', function(){
	this.timeout(10000);
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

describe('TestBrcodePaymentGet', function(){
  	this.timeout(10000);
  	it('test_success', async () => {
    	let i = 0;
      	const payments = await starkbank.brcodePayment.query({limit: 5});
      	for await (let payment of payments) {
          	assert(typeof payment.id == 'string');
        	i += 1;
      	}
      	assert(i === 5);
  	});
});

describe('TestBrcodePaymentInfoPatch', function(){
  this.timeout(20000);
  it('test_success_cancel', async () => {
	  let payments = await starkbank.brcodePayment.query({limit: 1, status: 'created'});
	  let i = 0;
		for await (let payment of payments) {
			assert(typeof payment.id == 'string');
			let updated_payment = await starkbank.brcodePayment.update(payment.id, {status: 'canceled'});
		  assert(updated_payment.status == 'canceled');
		  i += 1;
	  }
	  assert(i === 1);
  });
});

describe('TestBrcodePaymentPdfGet', function(){
    this.timeout(20000);
    it('test_success', async () => {
        let payments = await starkbank.brcodePayment.query({limit: 1, status: 'success'});
        for await (let payment of payments) {
					assert(typeof payment.id == 'string');
					let pdf = await starkbank.brcodePayment.pdf(payment.id);
					assert(Buffer.isBuffer(pdf));
        }
    });
});
