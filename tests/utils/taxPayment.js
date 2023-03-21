const TaxPayment = require('../../sdk/taxPayment').TaxPayment;
const DarfPayment = require('../../sdk/darfPayment').DarfPayment;
const generateExampleNonBoletoPaymentsJson = require('../../tests/utils/nonBoletoPayment').generateExampleNonBoletoPaymentsJson;
const futureDate = require('./random.js').futureDate;
const randomDateBetweenTwoDates = require('./random.js').randomDateBetweenTwoDates;
const randomInt = require('./random.js').randomInt;

const examplePayment = new TaxPayment({
    barCode: '83660000001084301380074119002551100010601813',
    scheduled: '2020-03-29',
    description: 'paying taxes'
});

const exampleDarfPayment = new DarfPayment({
    revenueCode: '1240',
    taxId: '012.345.678-90',
    competence: '2020-09-01',
    referenceNumber: '2340978970',
    nominalAmount: 1234,
    fineAmount: 12,
    interestAmount: 34,
    due: futureDate(randomInt(5, 10)),
    tags: ['tag1', 'tag2'],
    description: 'description test',
});

const generateExampleTaxPaymentsJson = (n = 1, amount = null, nextDay = false) => {
    return generateExampleNonBoletoPaymentsJson(
        n = n,
        amount = amount,
        nextDay = nextDay,
        isTax = true
    );
};

const generateExampleDarfPaymentsJson = (n = 1, randomSchedule = false) => {
    let payments = [];
    for (let i = 0; i < n; i++) {
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate()-randomInt(10, 100));
        const competenceDate = randomDateBetweenTwoDates(pastDate, new Date(Date.now()));
        let payment = {...exampleDarfPayment};
        payment.revenueCode = ('0000' + randomInt(0, 9999)).slice(-4);
        payment.nominalAmount = randomInt(100, 1000);
        payment.fineAmount = randomInt(10, 100);
        payment.interestAmount = randomInt(10, 100);
        payment.referenceNumber = String(randomInt(1, 1000));
        payment.competence = competenceDate.getFullYear() + '-' + String(competenceDate.getMonth()).padStart(2, '0') + '-' + String(competenceDate.getDate()).padStart(2, '0');
        payment.taxId = '012.345.678-90';
        if (randomSchedule) {
            payment.scheduled = futureDate(randomInt(5, 10));
        }
        payments.push(payment);
    }
    return payments;
};

exports.generateExampleTaxPaymentsJson = generateExampleTaxPaymentsJson;
exports.generateExampleDarfPaymentsJson = generateExampleDarfPaymentsJson;
