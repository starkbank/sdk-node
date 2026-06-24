const random = require('./random.js') ;
const transfer = require('./transfer.js');
const transaction = require('./transaction.js');
const boleto = require('./boletoPayment.js');
const utilityPayment = require('./utilityPayment.js');
const brcodePayment = require('./brcodePayment.js');
const taxPayment = require('./taxPayment.js');
const starkbank = require('../../index.js');
const { Transaction } = require('../../sdk/transaction/transaction.js');

function chooseType() {
    let randomNumber = random.randomInt(0, 6);
    switch (randomNumber) {
        case 0:
            return 'transfer';
        case 1:
            return 'transaction';
        case 2:
            return 'boleto-payment';
        case 3:
            return 'utility-payment';
        case 4:
            return 'brcode-payment';
        case 5:
            return 'tax-payment';
        case 6:
            return 'darf-payment';
        default:
            throw new Error('Bad random number ' + randomNumber);
    }
}

async function createPayments(type, n) {
    switch (type) {
        case 'transfer':
            return transfer.generateExampleTransfersJson(n, null, true);
        case 'transaction':
            return transaction.generateExampleTransactionsJson(n);
        case 'boleto-payment':
            return await boleto.generateExampleBoletoPaymentsJson(n, true);
        case 'utility-payment':
            return utilityPayment.generateExampleUtilityPaymentsJson(n, true);
        case 'brcode-payment':
            return brcodePayment.generateExampleBrcodePaymentsJson(n, true);
        case 'tax-payment':
            return taxPayment.generateExampleTaxPaymentsJson(n, null, true);
        case 'darf-payment':
            return taxPayment.generateExampleDarfPaymentsJson(n, true);
        default:
            throw new Error('Bad type ' + type);
    }
}

exports.generateExamplePaymentRequestJson = async function (n = 1, types = null) {
    let typeCounts = {
        'transfer': 0,
        'transaction': 0,
        'boleto-payment': 0,
        'utility-payment': 0,
        'brcode-payment': 0,
        'tax-payment': 0,
        'darf-payment': 0,
    };
    if (types) {
        for (let type of types) {
            typeCounts[type]++;
        }
    } else {
        for (let i = 0; i < n; i++) {
            typeCounts[chooseType()]++;
        }
    }
    let payments = [];
    let paymentTypes = [];
    for (var type in typeCounts) {
        if (typeCounts[type] === 0)
            continue;
        const newPayments = await createPayments(type, typeCounts[type]);
        payments = payments.concat(newPayments);
        for (let i = 0; i < newPayments.length; i++) {
            paymentTypes.push(type);
        }
    }

    let requests = [];
    for (let i = 0; i < payments.length; i++) {
        const payment = payments[i];
        const paymentType = paymentTypes[i];
        requests.push(new starkbank.PaymentRequest({
            centerId: process.env.SANDBOX_CENTER_ID,
            payment: payment,
            type: paymentType,
            due: payment instanceof Transaction ? null : (payment.scheduled?.substring(0,10) ?? null)
        }));
        payment.scheduled = null;
    }

    return requests;
}
