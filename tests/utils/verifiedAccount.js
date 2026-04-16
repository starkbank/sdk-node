const starkbank = require('../../index.js');


exports.bankInfoExample = function () {
    return new starkbank.VerifiedAccount({
        taxId: '911.544.440-66',
        number: '76543-8',
        bankCode: '341',
        branchCode: '2201',
        type: 'checking',
        name: 'Daenerys Targaryen Stormborn',
        tags: ['verified-account-test'],
    });
};

exports.pixKeyExample = function () {
    return new starkbank.VerifiedAccount({
        taxId: '039.946.040-36',
        keyId: 'arya.stark@starkbank.com',
        tags: ['verified-account-test'],
    });
};
