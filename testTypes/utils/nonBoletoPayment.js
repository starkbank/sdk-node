const starkbank = require('starkbank');
const random = require('./random.js');
const check = require('../../../sdk/utils/check.js');
const sha256 = require('js-sha256');
const utf8 = require('utf8');
const businesses = require('../utils/businesses');
const choice = businesses.choice;
const utilitySegments = businesses.utilitySegments;
const taxSegments = businesses.taxSegments;
const businessMap = businesses.businessMap;


const exampleUtilityPayment = new starkbank.UtilityPayment({
    barCode: '83660000001084301380074119002551100010601813',
    description: 'loading a random account',
    scheduled: '2020-02-29',
    tags: ["test1", "test2", "test3"]
});

const exampleTaxPayment = new starkbank.TaxPayment({
    barCode: '83660000001084301380074119002551100010601813',
    scheduled: '2020-02-29', 
    description: 'loading a random account',
    tags: ["test1", "test2", "test3"]
});

const replaceBarcode = (barcode, replacement, position) => {
    let length = replacement.length;
    return barcode.substring(0,position) + replacement + barcode.substring(position + length);
};

const zeroPad = (num, places) => String(num).padStart(places, '0');

const generateExampleNonBoletoPaymentsJson = (n=1, amount=null, nextDay=false, isTax=null) => {
    const examplePayment = isTax ? exampleTaxPayment : exampleUtilityPayment;
    let allowedSegments = new Set([...taxSegments.keys(),...utilitySegments.keys()]);
    
    if (isTax == false)
        allowedSegments = utilitySegments;
    if (isTax == true)
        allowedSegments = taxSegments;

    const payments = []
    for (let i=0;i<n;i++){
        let barCode = examplePayment.barCode;
        let randomSegment = choice([...allowedSegments.keys()]);
        let randomCode = zeroPad(choice([...businessMap.get(randomSegment).keys()]), 4);
        let randomAmount = amount ? amount : zeroPad(random.randomInt(100, 100000), 11);
        let randomTags = [];
        for (let i=0;i<random.randomInt(0,4); i++)
            randomTags.push(choice(examplePayment.tags));
        
        barCode = replaceBarcode(
            barCode = barCode,
            replacement = randomSegment,
            position = 1,
        );
        barCode = replaceBarcode(
            barCode = barCode,
            replacement = randomAmount,
            position = 4,
        );
        barCode = replaceBarcode(
            barCode = barCode,
            replacement = randomCode,
            position = 15,
        );
        let payment = Object.assign({},examplePayment);
        payment.barCode = barCode;
        payment.scheduled = nextDay ? check.date(random.futureDate(1)) : check.date(random.futureDate(0));
        payment.description = utf8.encode(sha256(randomAmount.toString(16)))
        payment.tags = randomTags;
        payments.push(payment);
    }

    return payments;
};

exports.generateExampleNonBoletoPaymentsJson = generateExampleNonBoletoPaymentsJson;
