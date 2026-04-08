import starkbank from "starkbank";

export function example(accountId: string): starkbank.VerifiedTransfer {
    return new starkbank.VerifiedTransfer({
        amount: 1000,
        accountId: accountId,
        tags: ['verified-transfer-test'],
    });
}
