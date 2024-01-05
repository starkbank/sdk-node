const starkbank = require('../../index.js');
const random = require('./random.js');
const check = require('starkcore').check;

exports.generateExampleUtilityPaymentsJson = function (n, scheduled = true) {
    
    let exampleUtilityPayment = {
        description: 'Random description',
        barCode: '83660000001084301380074119002551100010601813',
    };
    
    let payments = [];
    for (let i = 0; i < n; i++) {
        exampleUtilityPayment.description = 'random utility description';
        exampleUtilityPayment.barCode = '8366000' + ('00000000' + random.randomInt(1, 10000)).slice(-8) + '01380074119002551100010601813';
        if (scheduled)
            exampleUtilityPayment.scheduled = check.date(random.futureDate(7));
        payments.push(new starkbank.UtilityPayment(exampleUtilityPayment));
    }
    return payments;
};
