const starkbank = require('../../index.js');
const random = require('./random.js');
const check = require('../../sdk/utils/check.js');
const generateExampleBoletosJson = require('./boleto').generateExampleBoletosJson;

starkbank.user = require('../utils/user').exampleProject;

var defaultExampleBoletoPayment = new starkbank.BoletoPayment({
    taxId: '20.018.183/0001-80',
    line: '34191.09008 61713.957308 71444.640008 2 83430000984732',
    scheduled: '2020-02-29',
    description: 'loading a random account',
});


exports.generateExampleBoletoPaymentsJson = async function (n) {
    let boletos = generateExampleBoletosJson(n);
    let lines = [];
    let amounts = [];
    boletos = await starkbank.boleto.create(boletos);
    for (let i = 0; i < n; i++) {
        lines.push(boletos[i].line);
        amounts.push(boletos[i].amount);
    }

    let payments = [];
    let exampleBoletoPayment = JSON.parse(JSON.stringify(defaultExampleBoletoPayment));
    for (let i = 0; i < n; i++) {
        exampleBoletoPayment.line = lines[i];
        exampleBoletoPayment.description = `Pagamento ${amounts[i]}`;
        exampleBoletoPayment.scheduled = check.date(random.futureDate(7));
        payments.push(new starkbank.BoletoPayment(JSON.parse(JSON.stringify(exampleBoletoPayment))));
    }
    return payments;
};
