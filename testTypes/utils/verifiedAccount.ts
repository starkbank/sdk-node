import starkbank from "starkbank";

export function bankInfoExample(): starkbank.VerifiedAccount {
    return new starkbank.VerifiedAccount({
        taxId: '232.377.340-20',
        number: '76543-8',
        bankCode: '341',
        branchCode: '2201',
        type: 'checking',
        name: 'Daenerys Targaryen Stormborn',
        tags: ['verified-account-test'],
    });
}

export function pixKeyExample(): starkbank.VerifiedAccount {
    return new starkbank.VerifiedAccount({
        taxId: '039.946.040-36',
        keyId: 'arya.stark@starkbank.com',
        tags: ['verified-account-test'],
    });
}
