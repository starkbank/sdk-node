const starkbank = require('../../starkbank');

var defaultExampleBoleto = new starkbank.Boleto({
    amount: 10,
    name: 'Random Company',
    taxId: '012.345.678-90',
    streetLine1: 'Rua ABC',
    streetLine2: 'Ap 123',
    district: 'Copacabana',
    city: 'Rio de Janeiro',
    stateCode: 'SP',
    zipCode: '01234-567',
    due: '2020-03-29',
    fine: 0.00,
    interest: 0.00,
    overdueLimit: 59,
    tags: null,
    descriptions: [
        {
            'text': 'product A',
            'amount': 123
        },
{
    'text'
:
    'product B',
        'amount'
:
    456
}
,
{
    'text'
:
    'product C',
        'amount'
:
    789
}
]
});

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


exports.generateExampleBoletosJson = function (n, amount = null) {
    let boletos = [];
    let exampleBoleto = JSON.parse(JSON.stringify(defaultExampleBoleto));
    for (let i = 0; i < n; i++) {
        let boletoAmount = Math.floor(amount);
        if (!amount) {
            boletoAmount = randomInt(200, 1000);
        }
        exampleBoleto.name = 'Jon Snow'; //TODO random name generator
        exampleBoleto.amount = boletoAmount;
        exampleBoleto.due = '2020-04-30'; //TODO date generator
        exampleBoleto.taxId = '012.345.678-90'; // TODO taxId generator
        // boletos.push(Object.assign(new starkbank.Boleto({}), JSON.parse(JSON.stringify(exampleBoleto))));
        boletos.push(new starkbank.Boleto(JSON.parse(JSON.stringify(exampleBoleto))));
    }
    return boletos;
};
