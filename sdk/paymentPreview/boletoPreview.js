const SubResource = require('../utils/subResource.js').SubResource
const check = require('../utils/check.js');


class BoletoPreview extends SubResource {
    /**
     * 
     * BoletoPreview object
     * 
     * @description A BoletoPreview is used to get information from a Boleto Payment you received to check the information before the payment.
     * 
     * Attributes (return-only):
     * @param status [string]: current boleto status. ex: 'active', 'expired' or 'inactive'
     * @param amount [int]: amount final to be paid. ex: 23456 (= R$ 234.56)
     * @param discountAmount [int]: discount amount to be paid. ex: 23456 (= R$ 234.56)
     * @param fineAmount [int]: fine amount to be paid. ex: 23456 (= R$ 234.56)
     * @param interestAmount [int]: interest amount to be paid. ex: 23456 (= R$ 234.56)
     * @param due [string]: Boleto due date. ex: '2020-03-10'
     * @param expiration [string]: Boleto expiration date. ex: '2020-03-10'
     * @param name [string]: beneficiary full name. ex: 'Anthony Edward Stark'
     * @param taxId [string]: beneficiary tax ID (CPF or CNPJ). ex: '20.018.183/0001-80'
     * @param receiverName [string]: receiver (Sacador Avalista) full name. ex: 'Anthony Edward Stark'
     * @param receiverTaxId [string]: receiver (Sacador Avalista) tax ID (CPF or CNPJ). ex: '20.018.183/0001-80'
     * @param payerName [string]: payer full name. ex: 'Anthony Edward Stark'
     * @param payerTaxId [string]: payer tax ID (CPF or CNPJ). ex: '20.018.183/0001-80'
     * @param line [string]: Number sequence that identifies the payment. ex: '34191.09008 63571.277308 71444.640008 5 81960000000062'
     * @param barCode [string]: Bar code number that identifies the payment. ex: '34195819600000000621090063571277307144464000'
     * 
     */
    constructor(status, amount, discountAmount, fineAmount, interestAmount, due, expiration, 
        name, taxId, receiverName, receiverTaxId, payerName, payerTaxId, line, barCode) {
        super();
        this.status = status;
        this.amount = amount;
        this.discountAmount = discountAmount;
        this.fineAmount = fineAmount;
        this.interestAmount = interestAmount;
        this.due = check.date(due);
        this.expiration = check.date(expiration);
        this.name = name;
        this.taxId = taxId;
        this.receiverName = receiverName;
        this.receiverTaxId = receiverTaxId;
        this.payerName = payerName;
        this.payerTaxId = payerTaxId;
        this.line = line;
        this.barCode = barCode;
    }
}

exports.subResource = {'class': new BoletoPreview, 'name': 'BoletoPreview'}
