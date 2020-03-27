const starkbank = require('../../starkbank');

exampleUtilityPayment = new starkbank.UtilityPayment(
    'Random description',
    '2020-03-27',
    null,
    '83660000001084301380074119002551100010601813',
);

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
        let amountString = randomInt(100, 100000).toString();
        let paddedAmount = ("00000000000" + amountString).slice(-11);
        exampleUtilityPayment.description = 'abcdefghijklmnopqrstuvwxyz'; //TODO random description
        exampleUtilityPayment.barCode = barCode.substring(0, 4) + paddedAmount + barCode.substring(15);
        exampleUtilityPayment.scheduled = '2020-03-30'; //TODO date generator
        payments.push(JSON.parse(JSON.stringify(exampleUtilityPayment)));
    }
    return payments;
};
