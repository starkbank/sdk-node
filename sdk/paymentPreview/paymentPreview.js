const rest = require('../utils/rest.js');
const check = require('../utils/check.js');
const Resource = require('../utils/resource.js').Resource
const boletoPreviewSubResource = require('./boletoPreview.js').subResource
const brcodePreviewSubResource = require('./brcodePreview.js').subResource
const taxPreviewSubResource = require('./taxPreview.js').subResource
const utilityPreviewSubResource = require('./utilityPreview.js').subResource

const subResourceByType = {
    'boleto-payment': boletoPreviewSubResource,
    'brcode-payment': brcodePreviewSubResource,
    'tax-payment': taxPreviewSubResource,
    'utility-payment': utilityPreviewSubResource,
}

class PaymentPreview extends Resource {
    /**
     *
     * PaymentPreview object
     *
     * @description A PaymentPreview is used to get information from payment code you received to check the informations before paying it.
     * This resource can be used to preview BR Codes and bar codes of boletos, tax and utility payments
     *
     * Parameters (required):
     * @param id [string]: Main identification of the payment. This should be the BR Code for Pix payments and lines or bar codes for payment slips. ex: '34191.09008 63571.277308 71444.640008 5 81960000000062', '00020126580014br.gov.bcb.pix0136a629532e-7693-4846-852d-1bbff817b5a8520400005303986540510.005802BR5908T'Challa6009Sao Paulo62090505123456304B14A'
     *
     * Parameters (optional):
     * @param scheduled [string, default today]: intended payment date. Right now, this parameter only has effect on BrcodePreviews. ex: '2020-03-10'
     *
     * Attributes (return-only):
     * @param type [string]: Payment type. ex: 'brcode-payment', 'boleto-payment', 'utility-payment' or 'tax-payment'
     * @param payment [BrcodePreview, BoletoPreview, UtilityPreview or TaxPreview]: Information preview of the informed payment.
     *
     */
    constructor({id, scheduled = null, type = null, payment = null}) {
        super(id);
        this.scheduled = check.date(scheduled);
        this.type = type;
        this.payment = payment;
        if (subResourceByType.hasOwnProperty(type)) {
            this.payment = subResourceByType[type];
        }
    }
}

exports.PaymentPreview = PaymentPreview;
let resource = {'class': exports.PaymentPreview, 'name': 'PaymentPreview'};

exports.create = async function (previews, {user} = {}) {
    /**
     *
     * Create PaymentPreviews
     *
     * @description Send a list of PaymentPreviews objects for creation in the Stark Bank API
     *
     * Parameters (required):
     * @param previews [list of PaymentPreviews objects]: list of PaymentPreviews objects to be created in the API
     *
     * Parameters (optional):
     * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns list of PaymentPreviews objects with updated attributes
     *
     */
    return rest.post(resource, previews, user);
};
