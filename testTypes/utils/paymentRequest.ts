const random = require('./random.js') ;
const transfer = require('./transfer');
const transaction = require('./transaction');
const boleto = require('./boletoPayment');
const utilityPayment = require('./utilityPayment');
const brcodePayment = require('./brcodePayment');
const taxPayment = require('./taxPayment');
import starkbank,{ Transaction } from 'starkbank';

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

async function createPayments(type: string, n: number) {
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

export async function generateExamplePaymentRequestJson(n = 1, types: string[] | null = null) {
    let typeCounts: { [key: string]: number } = {
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
    let payments: starkbank.PaymentRequest[] = [];
    let paymentTypes: string[] = [];
    for (var type in typeCounts) {
        if (typeCounts[type] === 0)
            continue;
        const newPayments = await createPayments(type, typeCounts[type]);
        payments = payments.concat(newPayments);
        for (let i = 0; i < newPayments.length; i++) {
            paymentTypes.push(type);
        }
    }

    let requests: starkbank.PaymentRequest[] = [];
    for (let i = 0; i < payments.length; i++) {
        const payment: any = payments[i];
        const paymentType = paymentTypes[i];
        requests.push(new starkbank.PaymentRequest({
            centerId: process.env.SANDBOX_CENTER_ID as string,
            payment: payment,
            type: paymentType,
            due: payment instanceof Transaction ? null : (payment.scheduled?.substring(0,10) ?? null)
        }));
        payment.scheduled = null;
    }

    return requests;
}
