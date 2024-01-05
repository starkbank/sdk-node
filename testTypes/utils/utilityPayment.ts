import starkbank from "starkbank"
const random = require('./random.js');
const check = require('starkcore').check;

export function generateExampleUtilityPaymentsJson(n: number, scheduled = true) {
    
    let exampleUtilityPayment = {
        description: 'Random description',
        barCode: '83660000001084301380074119002551100010601813',
    };
    
    let payments = [];
    for (let i = 0; i < n; i++) {
        exampleUtilityPayment.description = 'random utility description';
        exampleUtilityPayment.barCode = '8366000' + ('00000000' + random.randomInt(1, 10000)).slice(-8) + '01380074119002551100010601813';
        payments.push(new starkbank.UtilityPayment(exampleUtilityPayment));
    }
    return payments;
};
