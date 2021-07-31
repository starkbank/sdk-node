const assert = require('assert');
const starkbank = require('../index.js');
const generateExampleBoletoPaymentsJson = require('./utils/boletoPayment.js').generateExampleBoletoPaymentsJson;
const generateExampleBrcodePaymentsJson = require('./utils/brcodePayment.js').generateExampleBrcodePaymentsJson;
const generateExampleTaxPaymentsJson = require('./utils/taxPayment.js').generateExampleTaxPaymentsJson;
const generateExampleUtilityPaymentsJson = require('./utils/utilityPayment.js').generateExampleUtilityPaymentsJson;
const check = require('../sdk/utils/check.js');


starkbank.user = require('./utils/user').exampleProject;

describe('TestPaymentPreviewCreate', function () {
    this.timeout(30000);
    it('test_success', async () => {
        let boletoPayments = await generateExampleBoletoPaymentsJson(1);
        let brcodePayments = await generateExampleBrcodePaymentsJson(1);
        let taxPayments = await generateExampleTaxPaymentsJson(1);
        let utilityPayments = await generateExampleUtilityPaymentsJson(1);

        let types = ['brcode-payment', 'boleto-payment', 'utility-payment', 'tax-payment'];

        let previews = [
            new starkbank.PaymentPreview({ id: brcodePayments[0].brcode }),
            new starkbank.PaymentPreview({ id: boletoPayments[0].line }),
            new starkbank.PaymentPreview({ id: utilityPayments[0].barCode }),
            new starkbank.PaymentPreview({ id: taxPayments[0].barCode })
        ]

        let previewedTypes = [];
        for (const preview of await starkbank.paymentPreview.create(previews)) {
            previewedTypes.push(preview.type);
        }

        assert(types.sort().toString() == previewedTypes.sort().toString())

        date = check.date(new Date().setDate(new Date().getDate() + 1));
        for (let preview of previews) {
            preview['scheduled'] = date;
        }

        previewedTypes = [];
        for (const preview of await starkbank.paymentPreview.create(previews)) {
            previewedTypes.push(preview.type);
        }

        assert(types.sort().toString() == previewedTypes.sort().toString())
    });
});
