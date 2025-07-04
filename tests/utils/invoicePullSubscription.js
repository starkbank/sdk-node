const { randomUUID } = require('crypto');

exports.generateExampleInvoicePullSubscriptionJson = function (type) {

     example = null;
     const today = new Date();
     const addDays = (date, days) => {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result.toISOString().split('T')[0];
    };

    if (type == "push")
    {
        example = {
            amount: 0,
            amountMinLimit: 5000,
            data: {
                accountNumber: "9123900000",
                bankCode: "05097757",
                branchCode: "1126",
                taxId: "20.018.183/0001-80"
            },
            displayDescription: "Dragon Travel Fare",
            externalId: randomUUID(),
            interval: "month",
            name: "John Snow",
            pullMode: "manual",
            pullRetryLimit: 3,
            start: addDays(today, 5),
            end: addDays(today, 35),
            referenceCode: "contract-12345",
            tags: [],
            taxId: "012.345.678-90",
            type: type
        };
    }
    if (type == "qrcode")
    {
        example = {
            amount: 0,
            amountMinLimit: 5000,
            displayDescription: "Dragon Travel Fare",
            externalId: randomUUID(),
            interval: "month",
            name: "John Snow",
            pullMode: "manual",
            pullRetryLimit: 3,
            start: addDays(today, 5),
            end: addDays(today, 35),
            referenceCode: "contract-12345",
            tags: [],
            taxId: "012.345.678-90",
            type: type
        };
    }
    if (type == "qrcodeAndPayment")
    {
        example = {
            amount: 0,
            amountMinLimit: 5000,
            data: {
                amount: 400000
            },
            displayDescription: "Dragon Travel Fare",
            externalId: randomUUID(),
            interval: "month",
            name: "John Snow",
            pullMode: "manual",
            pullRetryLimit: 3,
            start: addDays(today, 5),
            end: addDays(today, 35),
            referenceCode: "contract-12345",
            tags: [],
            taxId: "012.345.678-90",
            type: type
        };
    }
    if (type == "paymentAndOrQrcode")
    {
        example = {
            amount: 0,
            amountMinLimit: 5000,
            data: {
                amount: 400000,
                due: "2026-06-26T17:59:26.000000+00:00",
                fine: 2.5,
                interest: 1.3
            },
            displayDescription: "Dragon Travel Fare",
            externalId: randomUUID(),
            interval: "month",
            name: "John Snow",
            pullMode: "manual",
            pullRetryLimit: 3,
            start: addDays(today, 5),
            end: addDays(today, 35),
            referenceCode: "contract-12345",
            tags: [],
            taxId: "012.345.678-90",
            type: type
        };
    }
    return example;
};
