const rest = require('../utils/rest.js');
const check = require('starkcore').check;
const { Rule } = require('../transfer/rule/rule.js');
const ruleResource = require('../transfer/rule/rule.js').subResource;
const parseObjects = require('../utils/parse.js').parseObjects;
const Resource = require('starkcore').Resource;


class VerifiedTransfer extends Resource {
    /**
     *
     * VerifiedTransfer object
     *
     * @description When you initialize a VerifiedTransfer, the entity will not be automatically
     * created in the Stark Bank API. The 'create' function sends the objects
     * to the Stark Bank API and returns the list of created objects.
     *
     * Parameters (required):
     * @param amount [integer]: transfer value in cents. ex: 1234 (= R$ 12.34)
     * @param accountId [string]: receiver's VerifiedAccount ID. ex: '5656565656565656'
     *
     * Parameters (optional):
     * @param accountType [string, default 'checking']: receiver bank account type. This parameter only has effect on Pix Transfers. ex: 'checking', 'savings', 'salary' or 'payment'
     * @param externalId [string, default null]: url safe string that must be unique among all your transfers. Duplicated externalIds will cause failures. By default, this parameter will block any transfer that repeats amount and receiver information on the same date. ex: 'my-internal-id-123456'
     * @param scheduled [string, default now]: date or datetime when the transfer will be processed. May be pushed to next business day if necessary. ex: '2020-11-12T00:14:22.806+00:00' or '2020-11-30'
     * @param description [string, default null]: optional description to override default description to be shown in the bank statement. ex: 'Payment for service #1234'
     * @param displayDescription [string, default null]: optional description to be shown in the receiver bank interface. ex: 'Payment for service #1234'
     * @param tags [list of strings, default []]: list of strings for reference when searching for verified transfers. ex: ['employees', 'monthly']
     * @param rules [list of Transfer.Rules, default []]: list of Transfer.Rule objects for modifying transfer behaviour. ex: [Transfer.Rule(key="resendingLimit", value=5)]
     *
     * Attributes (return-only):
     * @param id [string]: unique id returned when the VerifiedTransfer is created. ex: '5656565656565656'
     * @param fee [integer]: fee charged when the transfer is created. ex: 200 (= R$ 2.00)
     * @param status [string]: current verified transfer status. ex: 'created', 'processing', 'success' or 'failed'
     * @param transactionIds [list of strings]: ledger transaction ids linked to this transfer (if there are two, second is the chargeback). ex: ['19827356981273']
     * @param metadata [dictionary object]: dictionary object used to store additional information about the VerifiedTransfer object.
     * @param created [string]: creation datetime for the verified transfer. ex: '2020-03-10 10:30:00.000'
     * @param updated [string]: update datetime for the verified transfer. ex: '2020-03-10 10:30:00.000'
     *
     */
    constructor({
                    amount, accountId, accountType, externalId, scheduled, description,
                    displayDescription, tags, rules, id, fee, status, transactionIds,
                    metadata, created, updated
                }) {
        super(id);
        this.amount = amount;
        this.accountId = accountId;
        this.accountType = accountType;
        this.externalId = externalId;
        this.scheduled = scheduled;
        this.description = description;
        this.displayDescription = displayDescription;
        this.tags = tags;
        this.rules = parseObjects(rules, ruleResource, Rule);
        this.fee = fee;
        this.status = status;
        this.transactionIds = transactionIds;
        this.metadata = metadata;
        this.created = check.datetime(created);
        this.updated = check.datetime(updated);
    }
}

exports.VerifiedTransfer = VerifiedTransfer;
let resource = {'class': exports.VerifiedTransfer, 'name': 'VerifiedTransfer'};

exports.create = async function (verifiedTransfers, {user} = {}) {
    /**
     *
     * Create VerifiedTransfers
     *
     * @description Send a list of VerifiedTransfer objects for creation in the Stark Bank API
     *
     * Parameters (required):
     * @param verifiedTransfers [list of VerifiedTransfer objects]: list of VerifiedTransfer objects to be created in the API
     *
     * Parameters (optional):
     * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns list of VerifiedTransfer objects with updated attributes
     *
     */
    return rest.post(resource, verifiedTransfers, user);
};
