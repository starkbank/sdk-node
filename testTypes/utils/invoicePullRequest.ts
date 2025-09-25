import starkbank from 'starkbank';

exports.generateExampleInvoicePullRequestJson = function (invoiceId: string, subscriptionId: string) {
    let examplePullRequest = {
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

    let requests = [];
    requests.push(new starkbank.InvoicePullRequest(examplePullRequest));

    return requests;
}