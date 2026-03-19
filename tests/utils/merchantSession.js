

exports.generateExampleMerchantSessionJson = function () {

    let merchantSessionJson = {
        allowedFundingTypes: [
            "debit",
            "credit"
        ],
        allowedInstallments: [
            {
                "count": 1,
                "totalAmount": 5000
            },
            {
                "count": 2,
                "totalAmount": 5500
            }
        ],
        expiration: 3600,
        challengeMode: "disabled",
        holderId: Math.floor(Math.random() * 10000000000000000).toString(),
        tags: [
            "purchase_1234"
        ],
        softDescriptor: "Test Descriptor"
    }

    return merchantSessionJson;
}

exports.generateExampleMerchantSessionPurchaseJson = function () {

    let merchantSessionPurchaseJson = {
        amount: 5000,
        installmentCount: 1,
        cardExpiration: "2035-01",
        cardNumber: "5315281703921200",
        cardSecurityCode: "123",
        holderName: "Rhaenyra Targaryenzzzz",
        holderEmail: "rhaenyra.targaryen@starkbank.com",
        holderPhone: "11985923451",
        fundingType: "credit",
        billingCountryCode: "BRA",
        billingCity: "Sao Paulo",
        billingStateCode: "SP",
        billingStreetLine1: "Av. Faria Lima, 1844",
        billingStreetLine2: "",
        billingZipCode: "01500-000",
        challengeMode: "disabled",
    }

    return merchantSessionPurchaseJson;
}
