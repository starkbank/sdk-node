const starkbank = require('../../../index');
const random = require('./random.js');

exports.generateExampleBoletosJson = function (n, amount = null) {

    let exampleBoleto = {
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
        receiverName: 'Random Company',
        receiverTaxId: '123.456.789-09',
        tags: null,
        descriptions: [
            {
                'text': 'product A',
                'amount': 123
            },
            {
                'text':
                    'product B',
                'amount':
                    456
            }
            ,
            {
                'text':
                    'product C',
                'amount':
                    789
            }
        ]
    };

    let boletos = [];
    for (let i = 0; i < n; i++) {
        let boletoAmount = Math.floor(amount);
        if (!amount) {
            boletoAmount = random.randomInt(200, 1000);
        }
        exampleBoleto.name = 'Jon Snow';
        exampleBoleto.amount = boletoAmount;
        exampleBoleto.due = random.futureDate(7);
        exampleBoleto.taxId = '012.345.678-90';
        boletos.push(new starkbank.Boleto(exampleBoleto));
    }
    return boletos;
};
