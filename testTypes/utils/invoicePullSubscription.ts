import { randomUUID } from 'crypto';
import starkbank from 'starkbank';

exports.generateExampleInvoicePullSubscriptionJson = function (type: string) {

    const today = new Date();
    const addDays = (date: Date, days: number) => {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result.toISOString().split('T')[0];
    };

    let subscriptions = [];

    if (type == "push") {
        let exampleSubscription = {
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
        subscriptions.push(new starkbank.InvoicePullSubscription(exampleSubscription));
    }
    if (type == "qrcode")
    {
        let exampleSubscription = {
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
        subscriptions.push(new starkbank.InvoicePullSubscription(exampleSubscription));
    }
    if (type == "qrcodeAndPayment")
    {
        let exampleSubscription = {
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
        subscriptions.push(new starkbank.InvoicePullSubscription(exampleSubscription));
    }
    if (type == "paymentAndOrQrcode")
    {
        let exampleSubscription = {
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
        subscriptions.push(new starkbank.InvoicePullSubscription(exampleSubscription));
    }

    return subscriptions;
};
