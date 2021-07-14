const starbank = require('../../sdk/taxPayment');
const generateExampleNonBoletoPaymentsJson = require('../../tests/utils/nonBoletoPayment').generateExampleNonBoletoPaymentsJson;

const examplePayment = new starbank.TaxPayment({
    barCode: "83660000001084301380074119002551100010601813",
    scheduled: "2020-03-29",
    description: "pagando a conta"
});

const generateExampleTaxPaymentsJson = (n=1, amount=null, nextDay=false) => {
    return generateExampleNonBoletoPaymentsJson(
        n = n,
        amount = amount,
        nextDay = nextDay,
        isTax = true
    );
};

exports.generateExampleTaxPaymentsJson = generateExampleTaxPaymentsJson;
