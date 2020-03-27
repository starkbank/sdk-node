const starkbank = require('../starkbank');
const user = require('./utils/user').exampleProject;
const generateExampleUtilityPaymentsJson = require('./utils/utilityPayment.js').generateExampleUtilityPaymentsJson;


(async () => {
    let payments = generateExampleUtilityPaymentsJson(5);
    payments = await starkbank.payment.utility.create(payments, user);
    console.log(payments)
    // for (let i of payments){
    //     console.log(payment)
    // }
    // payment = await starkbank.payment.get('6573629986832384', user)
    // console.log(payment)
})();