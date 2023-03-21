const SubResource = require('../utils/subResource.js').SubResource


class BrcodePreview extends SubResource {
    /**
     * 
     * BrcodePreview object
     * 
     * @description A BrcodePreview is used to get information from a BR Code you received to check the information before the payment.
     * 
     * Attributes (return-only):
     * @param status [string]: Payment status. ex: 'active', 'paid', 'canceled' or 'unknown'
     * @param name [string]: Payment receiver name. ex: 'Tony Stark'
     * @param taxId [string]: Payment receiver tax ID. ex: '012.345.678-90'
     * @param bankCode [string]: Payment receiver bank code. ex: '20018183'
     * @param branchCode [string]: Payment receiver branch code. ex: '0001'
     * @param accountNumber [string]: Payment receiver account number. ex: '1234567'
     * @param accountType [string]: Payment receiver account type. ex: 'checking'
     * @param allowChange [bool]: If true, the payment is able to receive amounts that are different from the nominal one. ex: true or false
     * @param amount [integer]: Value in cents that this payment is expecting to receive. If 0, any value is accepted. ex: 123 (= R$1,23)
     * @param nominalAmount [integer]: Original value in cents that this payment was expecting to receive without the discounts, fines, etc.. If 0, any value is accepted. ex: 123 (= R$1,23)
     * @param interestAmount [integer]: Current interest value in cents that this payment is charging. If 0, any value is accepted. ex: 123 (= R$1,23)
     * @param fineAmount [integer]: Current fine value in cents that this payment is charging. ex: 123 (= R$1,23)
     * @param reductionAmount [integer]: Current value reduction value in cents that this payment is expecting. ex: 123 (= R$1,23)
     * @param discountAmount [integer]: Current discount value in cents that this payment is expecting. ex: 123 (= R$1,23)
     * @param reconciliationId [string]: Reconciliation ID linked to this payment. ex: 'txId', 'payment-123'
     * 
     */
    constructor(status, name, taxId, bankCode, branchCode, accountNumber, accountType, 
        allowChange, amount, nominalAmount, interestAmount, fineAmount, reductionAmount, 
        discountAmount, reconciliationId) 
    {
        super();
        this.status = status;
        this.name = name;
        this.taxId = taxId;
        this.bankCode = bankCode;
        this.branchCode = branchCode;
        this.accountNumber = accountNumber;
        this.accountType = accountType;
        this.allowChange = allowChange;
        this.amount = amount;
        this.nominalAmount = nominalAmount;
        this.interestAmount = interestAmount;
        this.fineAmount = fineAmount;
        this.reductionAmount = reductionAmount;
        this.discountAmount = discountAmount;
        this.reconciliationId = reconciliationId;
    }
}

exports.subResource = {'class': new BrcodePreview, 'name': 'BrcodePreview'}
