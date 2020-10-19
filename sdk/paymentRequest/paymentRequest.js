const { BoletoPayment } = require('../boletoPayment/boletoPayment.js');
const { Transaction } = require('../transaction/transaction.js');
const { Transfer } = require('../transfer/transfer.js');
const { UtilityPayment } = require('../utilityPayment/utilityPayment.js');
const rest = require('../utils/rest.js');
const Resource = require('../utils/resource.js').Resource


class PaymentRequest extends Resource {

     /**
     * PaymentRequest constructor
     *
     * A PaymentRequest is an indirect request to access a specific cash-out service
     *     (such as Transfer, BoletoPayments, etc.) which goes through the cost center
     *     approval flow on our website. To emit a PaymentRequest, you must direct it to
     *     a specific cost center by its ID, which can be retrieved on our website at the
     *     cost center page.
     * 
     * Parameters (required):
     * @param centerId [string]: target cost center ID. ex: '5656565656565656'
     * @param payment [Transfer, BoletoPayment, UtilityPayment, Transaction or dictionary]: payment entity that should be approved and executed.
     * 
     * Parameters (conditionally required):
     * @param type [string]: payment type, inferred from the payment parameter if it is not a dictionary. ex: 'transfer', 'boleto-payment'
     * 
     * Parameters (optional):
     * @param due [string]: PaymentRequest target date in ISO format.
     * @param tags [string]: list of strings for tagging
     * 
     * Attributes (return-only):
     * @param id [string, default null]: Object's id
     * @param amount [integer, default null]: PaymentRequest amount. ex: 100000 = R$1.000,00
     * @param status [string, default null]: current PaymentRequest status.ex: 'pending' or 'approved'
     * @param actions [list of dictionaries, default null]: list of actions that are affecting this PaymentRequest. ex: [{'type': 'member', 'id': '56565656565656, 'action': 'requested'}]
     * @param updated [datetime string, default null]: latest update datetime for the PaymentRequest. ex: 2020-12-31
     * @param created [datetime string, default null]: creation datetime for the PaymentRequest. ex: 2020-12-31
     */
    constructor({ 
        centerId, payment, type, due = null, tags = null, id = null, amount = null,
        status = null, actions = null, updated = null, created = null
    }) {
        super(id);
        this.centerId = centerId;
        this.due = due;
        this.tags = tags;
        this.amount = amount;
        this.status = status;
        this.actions = actions;
        this.updated = updated;
        this.created = created;
        let parsePaymentObject = parsePayment(payment, type);
        this.payment = parsePaymentObject['payment'];
        this.type = parsePaymentObject['type'];
    }
}

parsePayment = function (payment, type) {
    if (payment.constructor == Object) {
        if (type)
            return { 'payment': payment, 'type': type };
        throw 'if payment is a dictionary, type must be' +
            ' transfer' +
            ', transaction' +
            ', boleto-payment' +
            'or utility-payment';
    }

    if (payment instanceof Transfer)
        type = 'transfer';
    if (payment instanceof Transaction)
        type = 'transaction';
    if (payment instanceof BoletoPayment)
        type = 'boleto-payment';
    if (payment instanceof UtilityPayment)
        type = 'utility-payment';

    if (type)
        return { 'payment': payment, 'type': type };

    throw new Error('payment must be either ' +
        'a dictionary' +
        ', a starkbank.Transfer' +
        ', a starkbank.Transaction' +
        ', a starkbank.BoletoPayment' +
        ' or a starkbank.UtilityPayment' +
        ', but not a ' + typeof (payment)
    );
}

exports.PaymentRequest = PaymentRequest;
let resource = {'class': exports.PaymentRequest, 'name': 'PaymentRequest'};

exports.create = async function(paymentRequests, {user} = {}) {
/**
     * Create PaymentRequests
     * 
     * @description Send a list of PaymentRequests objects for creation in the Stark Bank API
     *
     * Parameters (required):
     * @param paymentRequests [list of PaymentRequest objects]: list of PaymentRequest objects to be created in the API
     * @param user [Project object]: Project object. Not necessary if starkbank.user was set before function call
     * 
     * Return:
     * @return list of PaymentRequest objects with updated attributes
     */
    return rest.post(resource, paymentRequests, user);
}

exports.query = async function ({ centerId, limit, after, before, sort, status, type, tags, ids, user } = {}) {
    /**
     *
     * Retrieve PaymentRequests
     *
     * @description Receive a generator of PaymentRequests objects previously created in the Stark Bank API
     *
     * Parameters (required):
     * @param centerId [string]: target cost center ID. ex: '5656565656565656'
     * 
     * Parameters (optional):
     * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
     * @param after [string, default null] date filter for objects created/due only after specified date. ex: '2020-03-10'
     * @param before [string, default null] date filter for objects created/due only before specified date. ex: '2020-03-10'
     * @param sort[string, default '-created']: sort order considered in response.Valid options are '-created' or '-due'.
     * @param status [string, default null]: filter for status of retrieved objects.ex: 'success' or 'failed'
     * @param type [string, default null]: payment type , inferred from the payment parameter if it is not a dictionary.ex: 'transfer', 'boleto-payment'
     * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
     * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
     * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns generator of PaymentRequests objects with updated attributes
     *
     */
    let query = {
        centerId: centerId,
        limit: limit,
        after: after,
        before: before,
        sort: sort,
        status: status,
        type: type,
        tags: tags,
        ids: ids,
    };
    return rest.getList(resource, query, user);
};
