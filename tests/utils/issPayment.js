const starkbank = require('../../index.js');
const random = require('./random.js');
const check = require('../../sdk/utils/check.js');

exampleIssPayment = new starkbank.IssPayment({
    description: 'Random description',
    scheduled: '2020-03-27',
    barCode: '83660000001084301380074119002551100010601813',
});


exports.generateExampleIssPaymentsJson = function (n, amount = null) {
    payments = [];
    exampleIssPayment = JSON.parse(JSON.stringify(exampleIssPayment));
    for (let i = 0; i < n; i++) {
        exampleIssPayment.description = 'random utility description';
        exampleIssPayment.barCode = '8366000' + ('00000000' + random.randomInt(1, 10000)).slice(-8) + '01380074119002551100010601813';
        exampleIssPayment.scheduled = check.date(random.futureDate(7));
        payments.push(JSON.parse(JSON.stringify(exampleIssPayment)));
    }
    return payments;
};
