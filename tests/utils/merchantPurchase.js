const randomInt = require('./random.js');


exports.generateExampleMerchantPurchaseJson = function () {

    let merchantPurchaseJson = {
        amount: 10000,
        installmentCount: 5,
        cardId: "5052994169077760",
        fundingType: "credit",
        challengeMode: "disabled",
        billingCity: "Sao Paulo",
        billingCountryCode: "BRA",
        billingStateCode: "SP",
        billingStreetLine1: "Rua Casterly Rock, 2000",
        billingStreetLine2: "1 andar",
        billingZipCode: "01450-000",
        holderEmail: "tywin.lannister@starkbank.com",
        holderPhone: "11985923451",
        holderId: randomInt.randomInt(100000, 1000000).toString(),
        metadata: {
            userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36",
            userIp: "184.82.170.183",
            language: "pt-BR"
        },
        softDescriptor: "Test Descriptor"
    }

    return merchantPurchaseJson;
}
