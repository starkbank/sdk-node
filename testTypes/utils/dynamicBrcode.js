const starkbank = require('../../index.js');
const random = require('./random.js');

exports.generateExampleDynamicBrcodesJson = function (n, amount = null) {

    let exampleDynamicBrcode = {
        amount: 1000,
        expiration: 4000,
        tags: [ "SDK Node Test" ]
    };

    let brcodes = [];
    for (let i = 0; i < n; i++) {
        let brcodeAmount = Math.floor(amount);
        if (!amount) {
            brcodeAmount = random.randomInt(200, 1000);
        }
        exampleDynamicBrcode.amount = brcodeAmount;
        brcodes.push(new starkbank.DynamicBrcode(exampleDynamicBrcode));
    }
    return brcodes;
};
