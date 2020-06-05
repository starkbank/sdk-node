const assert = require('assert');
const starkbank = require('../index.js');
const { futureDate } = require('./utils/random')

starkbank.user = require('./utils/user').exampleProject;


describe('TestBoletoPaymentLogGet', () => {
    it('test_success', async () => {
        let i = 0;
        const logs = await starkbank.boletoPayment.log.query({limit: 5});
        for await (let log of logs) {
            assert(typeof log.id == 'string');
            i += 1;
        }
        assert(i === 5);
    });

    it('works with paymentIds', async () => {
        const makeBoleto = (name, amount) => ({
            amount: amount,
            name: name,
            taxId: '012.345.678-90',
            streetLine1: 'Av. Paulista, 200',
            streetLine2: '10 andar',
            district: 'Bela Vista',
            city: 'São Paulo',
            stateCode: 'SP',
            zipCode: '01310-000',
        })

        let [boleto1, boleto2] = await starkbank.boleto.create([
            makeBoleto("Fulano de Tal", 10000),
            makeBoleto("Beltrano da Silta", 10000),
        ])

        const tomorrow = futureDate(1)

        let [payment1, payment2] = await starkbank.boletoPayment.create([
            {
                taxId: boleto1.taxId,
                description: `Payment to ${boleto1.name}`,
                scheduled: tomorrow,
                line: boleto1.line,
            },
            {
                taxId: boleto2.taxId,
                description: `Payment to ${boleto2.name}`,
                scheduled: tomorrow,
                line: boleto2.line,
            }
        ]);

        let paymentLogs = await starkbank.boletoPayment.log.query({
            paymentIds: [payment1.id]
        });

        for await (let log of paymentLogs) {
            assert(log.payment.id == payment1.id)
        }

        let paymentLogs2 = await starkbank.boletoPayment.log.query({
            paymentIds: [payment2.id]
        });

        for await (let log of paymentLogs2) {
            assert(log.payment.id == payment2.id)
        }
    });
});


describe('TestBoletoPaymentLogInfoGet', () => {
    it('test_success', async () => {
        let logs = await starkbank.boletoPayment.log.query({limit: 1});
        for await (let log of logs) {
            assert(typeof log.id == 'string');
            log = await starkbank.boletoPayment.log.get(log.id);
            assert(typeof log.id == 'string');
        }
    });
});
