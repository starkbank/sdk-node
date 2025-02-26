

exports.generateExampleMerchantSessionJson = function () {

    let merchantSessionJson = {
        allowedFundingTypes: [
            "debit",
            "credit"
        ],
        allowedInstallments: [
            {
                "totalAmount": 0,
                "count": 1
            },
            {
                "totalAmount": 120,
                "count": 2
            },
            {
                "totalAmount": 180,
                "count": 12
            }
        ],
        expiration: 3600,
        challengeMode: "disabled",
        tags: [
            "yourTags"
        ]
    }

    return merchantSessionJson;
}

exports.generateExampleMerchantSessionPurchaseJson = function () {

    let merchantSessionPurchaseJson = {
        amount: 180,
        installmentCount: 12,
        cardExpiration: "2035-01",
        cardNumber: "5277696455399733",
        cardSecurityCode: "123",
        holderName: "Holder Name",
        holderEmail: "holdeName@email.com",
        holderPhone: "11111111111",
        fundingType: "credit",
        billingCountryCode: "BRA",
        billingCity: "São Paulo",
        billingStateCode: "SP",
        billingStreetLine1: "Rua do Holder Name, 123",
        billingStreetLine2: "",
        billingZipCode: "11111-111",
        metadata: {
            "userAgent": "Postman",
            "userIp": "255.255.255.255",
            "language": "pt-BR",
            "timezoneOffset": 3,
            "extraData": "extraData"
        }
    }

    return merchantSessionPurchaseJson;
}
