const rest = require('../utils/rest.js');
const check = require('../utils/check.js');
const Resource = require('../utils/resource.js').Resource;

class BrcodePreview extends Resource {
    /**
     *
     * BrcodePreview object
     * 
     * DEPRECATED: USE PaymentPreview INSTEAD
     *
     * @description A BrcodePreview is used to get information from a BRCode you received to check the informations before paying it.
     *
     * Attributes (return-only): 
     * @param status [string]: Payment status. ex: 'active', 'paid', 'canceled' or 'unknown'
     * @param name [string]: Payment receiver name. ex: 'Tony Stark'
     * @param taxId [string]: Payment receiver tax ID. ex: '012.345.678-90'
     * @param bankCode [string]: Payment receiver bank code. ex: '20018183'
     * @param branchCode [string]: Payment receiver branch code. ex: '0001'
     * @param accountNumber [string]: Payment receiver account number. ex: '1234567'
     * @param accountType [string]: Payment receiver account type. ex: 'checking'
     * @param allowChange [bool]: If True, the payment is able to receive amounts that are diferent from the nominal one. ex: True or False
     * @param amount [integer]: Value in cents that this payment is expecting to receive. If 0, any value is accepted. ex: 123 (= R$1,23)
     * @param reconciliationId [string]: Reconciliation ID linked to this payment. ex: 'txId', 'payment-123'
     *
     */
    constructor({
                    status, name, taxId, bankCode, branchCode, accountNumber, accountType, allowChange, amount, reconciliationId
    }) {
        super(null);
        this.status = status;
        this.name = name;
        this.taxId = taxId;
        this.bankCode = bankCode;
        this.branchCode = branchCode;
        this.accountNumber = accountNumber;
        this.accountType = accountType;
        this.allowChange = allowChange;
        this.amount = amount;
        this.reconciliationId = reconciliationId;
    }
}
exports.BrcodePreview = BrcodePreview;
let resource = {'class': exports.BrcodePreview, 'name': 'BrcodePreview'};

exports.query = async function ({brcodes, limit, user} = {}) {
    /**
     *
     * Retrieve BrcodePreviews
     *
     * @description Receive a generator of BrcodePreview objects previously created in the Stark Bank API
     *
     * Parameters (optional):
     * @param brcodes [list of strings]: List of brcodes to preview. ex: ["00020126580014br.gov.bcb.pix0136a629532e-7693-4846-852d-1bbff817b5a8520400005303986540510.005802BR5908T'Challa6009Sao Paulo62090505123456304B14A"]
     * @param user [Project object, default None]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns generator of BrcodePreview objects with updated attributes
     *
     */
    let query = {
        brcodes: brcodes,
        limit: limit,
    };
    return rest.getList(resource, query, user);
};
