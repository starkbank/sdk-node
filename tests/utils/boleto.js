const starkbank = require('../../starkbank');

exampleBoleto = new starkbank.Boleto(
    10,
    'Random Company',
    '012.345.678-90',
    'Rua ABC',
    'Ap 123',
    'Jardim Paulista',
    'São Paulo',
    'SP',
    '01234-567',
    '2020-03-29',
    0.00,
    0.00,
    59,
    null,
    [
        {
            'text': 'product A',
            'amount': 123
        },
        {
            'text': 'product B',
            'amount': 456
        },
        {
            'text': 'product C',
            'amount': 789
        }
    ]
);

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


exports.generateExampleBoletosJson = function (n, amount = null) {
    boletos = [];
    exampleBoleto = JSON.parse(JSON.stringify(exampleBoleto));
    for (let i = 0; i < n; i++) {
        boletoAmount = Math.floor(amount);
        if (!amount) {
            boletoAmount = randomInt(5, 100);
        }
        exampleBoleto.name = 'Jon Snow'; //TODO random name generator
        exampleBoleto.amount = boletoAmount;
        exampleBoleto.due = '2020-03-30'; //TODO date generator
        exampleBoleto.taxId = '012.345.678-90'; // TODO taxId generator
        boletos.push(JSON.parse(JSON.stringify(exampleBoleto)));
    }
    return boletos;
};
// console.log(generateExampleBoletosJson(3));
// console.log(generateExampleBoletosJson(3)[0]['amount']);
