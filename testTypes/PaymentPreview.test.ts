///<reference types="../types/" />
import starkbank from "starkbank";
import assert from 'assert';

import { generateExampleBrcodePaymentsJson } from './utils/brcodePayment'
import { generateExampleTaxPaymentsJson } from './utils/taxPayment'
import { generateExampleUtilityPaymentsJson } from './utils/utilityPayment'
const check = require('../sdk/utils/check.js');


starkbank.user = require('./utils/user').exampleProject;

describe('TestPaymentPreviewCreate', function () {
    jest.setTimeout(30000);
    it('test_success', async () => {
        let brcodePayments = await generateExampleBrcodePaymentsJson(1);
        let taxPayments = await generateExampleTaxPaymentsJson(1);
        let utilityPayments = await generateExampleUtilityPaymentsJson(1);

        let types = ['brcode-payment', 'boleto-payment', 'utility-payment', 'tax-payment'];

        let previews: starkbank.PaymentPreview[] = [
            new starkbank.PaymentPreview({ id: brcodePayments[0].brcode }),
            new starkbank.PaymentPreview({ id: utilityPayments[0].barCode as string }),
            new starkbank.PaymentPreview({ id: taxPayments[0].barCode })
        ]

        let previewedTypes: string[] = [];
        for (const preview of await starkbank.paymentPreview.create(previews)) {
            previewedTypes.push(preview.type);
        }

        let date = check.date(new Date().setDate(new Date().getDate() + 1));
        for (let preview of previews) {
            preview['scheduled'] = date;
        }

        previewedTypes = [];
        for (const preview of await starkbank.paymentPreview.create(previews)) {
            previewedTypes.push(preview.type);
        }
    });
});
