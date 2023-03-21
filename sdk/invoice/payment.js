const SubResource = require('../utils/subResource.js').SubResource


class Payment extends SubResource {
    /**
     * 
     * Invoice.Payment object
     * 
     * @description When an Invoice is paid, its Payment sub-resource will become available.
     * It carries all the available information about the invoice payment.
     * 
     * Attributes:
     * @param amount [integer]: amount in cents that was paid. ex: 1234 (= R$ 12.34)
     * @param name [string]: payer full name. ex: 'Anthony Edward Stark'
     * @param taxId [string]: payer tax ID (CPF or CNPJ). ex: '20.018.183/0001-80'
     * @param bankCode [string]: code of the payer bank institution in Brazil. ex: '20018183'
     * @param branchCode [string]: payer bank account branch. ex: '1357-9'
     * @param accountNumber [string]: payer bank account number. ex: '876543-2'
     * @param accountType [string]: payer bank account type. ex: 'checking', 'savings', 'salary' or 'payment'
     * @param endToEndId [string]: central bank's unique transaction ID. ex: 'E79457883202101262140HHX553UPqeq'
     * @param method [string]: payment method that was used. ex: 'pix'
     * 
     */
    constructor(name=null, taxId=null, bankCode=null, branchCode=null, accountNumber=null, accountType=null, amount=null, endToEndId=null, method=null) {
        super();
        this.amount = amount;
        this.name = name;
        this.taxId = taxId;
        this.bankCode = bankCode;
        this.branchCode = branchCode;
        this.accountNumber = accountNumber;
        this.accountType = accountType;
        this.endToEndId = endToEndId;
        this.method = method;
    }
}

exports.subResource = {'class': new Payment, 'name': 'Payment'}
