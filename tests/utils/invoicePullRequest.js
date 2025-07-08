

exports.generateExampleInvoicePullRequestJson = function (invoiceId, subscriptionId) {

    let request = {
        attemptType: "default",
        due: (() => {
            const futureDate = new Date();
            futureDate.setDate(futureDate.getDate() + 4);
            return futureDate.toISOString().split('T')[0];
        })(),
        invoiceId: invoiceId,
        subscriptionId: subscriptionId,
        tags: []
    }

    return request;
};
