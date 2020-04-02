const starkbank = require('../../starkbank');
const random = require('./random.js');
const check = require('../../starkbank/utils/check.js');

exampleUtilityPayment = new starkbank.UtilityPayment({
    description: 'Random description',
    scheduled: '2020-03-27',
    barCode: '83660000001084301380074119002551100010601813',
});

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


exports.generateExampleUtilityPaymentsJson = function (n, amount = null) {
    payments = [];
    exampleUtilityPayment = JSON.parse(JSON.stringify(exampleUtilityPayment));
    for (let i = 0; i < n; i++) {
        let barCode = '83660000001084301380074119002551100010601813';
        let amountString = random.randomInt(100, 100000).toString();
        let paddedAmount = ('00000000000' + amountString).slice(-11);
        exampleUtilityPayment.description = 'abcdefghijklmnopqrstuvwxyz';
        exampleUtilityPayment.barCode = barCode.substring(0, 4) + paddedAmount + barCode.substring(15);
        exampleUtilityPayment.scheduled = check.date(random.futureDate(7));
        payments.push(JSON.parse(JSON.stringify(exampleUtilityPayment)));
    }
    return payments;
};
