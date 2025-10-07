import starkbank from 'starkbank';

exports.generateExampleSplitReceiverJson = function () {
    let splitReceiver = {
        name: 'John Snow',
        taxId: '56411356076',
        bankCode: '18236120',
        branchCode: '001',
        accountNumber: '10000-0',
        accountType: 'checking'
    }

    return new starkbank.SplitReceiver(splitReceiver);
}
