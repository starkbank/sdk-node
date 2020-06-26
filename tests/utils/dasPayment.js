const starkbank = require('../../index.js');
const random = require('./random.js');
const check = require('../../sdk/utils/check.js');

exampleDasPayment = new starkbank.DasPayment({
    description: 'Random description',
    scheduled: '2020-03-27',
    barCode: '83660000001084301380074119002551100010601813',
});


exports.generateExampleDasPaymentsJson = function (n, amount = null) {
    payments = [];
    exampleDasPayment = JSON.parse(JSON.stringify(exampleDasPayment));
    for (let i = 0; i < n; i++) {
        exampleDasPayment.description = 'random utility description';
        exampleDasPayment.barCode = '8366000' + ('00000000' + random.randomInt(1, 10000)).slice(-8) + '01380074119002551100010601813';
        exampleDasPayment.scheduled = check.date(random.futureDate(7));
        payments.push(JSON.parse(JSON.stringify(exampleDasPayment)));
    }
    return payments;
};
