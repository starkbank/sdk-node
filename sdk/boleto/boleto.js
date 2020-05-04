const rest = require('../utils/rest.js');
const check = require('../utils/check.js');
const Resource = require('../utils/resource.js').Resource


class Boleto extends Resource {
    /**
     *
     * Boleto object
     *
     * When you initialize a Boleto, the entity will not be automatically
     * sent to the Stark Bank API. The 'create' function sends the objects
     * to the Stark Bank API and returns the list of created objects.
     *
     * Parameters (required):
     * amount [integer]: Boleto value in cents. Minimum = 200 (R$2,00). ex: 1234 (= R$ 12.34)
     * name [string]: payer full name. ex: 'Anthony Edward Stark'
     * taxId [string]: payer tax ID (CPF or CNPJ) with or without formatting. ex: '01234567890' or '20.018.183/0001-80'
     * streetLine1 [string]: payer main address. ex: Av. Paulista, 200
     * streetLine2 [string]: payer address complement. ex: Apto. 123
     * district [string]: payer address district / neighbourhood. ex: Bela Vista
     * city [string]: payer address city. ex: Rio de Janeiro
     * stateCode [string]: payer address state. ex: GO
     * zipCode [string]: payer address zip code. ex: 01311-200
     *
     * Parameters (optional):
     * due [string, default today + 2 days]: Boleto due date in ISO format. ex: 2020-04-30
     * fine [float, default 0.0]: Boleto fine for overdue payment in %. ex: 2.5
     * interest [float, default 0.0]: Boleto monthly interest for overdue payment in %. ex: 5.2
     * overdueLimit [integer, default 59]: limit in days for automatic Boleto cancellation after due date. ex: 7 (max: 59)
     * descriptions [list of dictionaries, default null]: list of dictionaries with 'text':string and (optional) 'amount':int pairs
     * discounts [list of dictionaries, default null]: list of dictionaries with "percentage":float and "date":string pairs
     * tags [list of strings]: list of strings for tagging
     *
     * Attributes (return-only):
     * id [string, default null]: unique id returned when Boleto is created. ex: '5656565656565656'
     * fee [integer, default null]: fee charged when Boleto is paid. ex: 200 (= R$ 2.00)
     * line [string, default null]: generated Boleto line for payment. ex: '34191.09008 63571.277308 71444.640008 5 81960000000062'
     * barCode [string, default null]: generated Boleto bar-code for payment. ex: '34195819600000000621090063571277307144464000'
     * status [string, default null]: current Boleto status. ex: 'registered' or 'paid'
     * balance [integer, default null]: account balance after transaction was processed. ex: 100000000 (= R$ 1,000,000.00)
     * created [string, default null]: creation datetime for the Boleto. ex: '2020-03-10 10:30:00.000'
     *
     */
    constructor({
                    amount, name, taxId, streetLine1, streetLine2, district, city, stateCode, zipCode,
                    due = null, fine = null, interest = null, overdueLimit = null,
                    tags = null, descriptions = null, discounts = null, id = null,
                    fee = null, line = null, barCode = null, status = null, balance = null,
                    created = null
                }) {
        super(id);
        this.amount = amount;
        this.name = name;
        this.taxId = taxId;
        this.streetLine1 = streetLine1;
        this.streetLine2 = streetLine2;
        this.district = district;
        this.city = city;
        this.stateCode = stateCode;
        this.zipCode = zipCode;
        this.due = check.date(due);
        this.fine = fine;
        this.interest = interest;
        this.overdueLimit = overdueLimit;
        this.tags = tags;
        this.descriptions = descriptions;
        this.discounts = discounts;
        this.fee = fee;
        this.line = line;
        this.barCode = barCode;
        this.status = status;
        this.balance = balance;
        this.created = created;
    }
}

exports.Boleto = Boleto;
let resource = {'class': exports.Boleto, 'name': 'Boleto'};

exports.create = async function (boletos, {user} = {}) {
    /**
     *
     * Create Boletos
     *
     * Send a list of Boleto objects for creation in the Stark Bank API
     *
     * Parameters (required):
     * boletos [list of Boleto objects]: list of Boleto objects to be created in the API
     *
     * Parameters (optional):
     * user [Project object]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * list of Boleto objects with updated attributes
     *
     */
    return rest.post(resource, boletos, user);
};

exports.get = async function (id, {user} = {}) {
    /**
     *
     * Retrieve a specific Boleto
     *
     * Receive a single Boleto object previously created in the Stark Bank API by passing its id
     *
     * Parameters (required):
     * id [string]: object unique id. ex: '5656565656565656'
     * Parameters (optional):
     * user [Project object]: Project object. Not necessary if starkbank.user was set before function call
     * Return:
     * Boleto object with updated attributes
     *
     */
    return rest.getId(resource, id, user);
};

exports.pdf = async function (id, {user} = {}) {
    /**
     *
     * Retrieve a specific Boleto pdf file
     *
     * Receive a single Boleto pdf file generated in the Stark Bank API by passing its id.
     *
     * Parameters (required):
     * id [string]: object unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * user [Project object]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * Boleto pdf file
     *
     */
    return rest.getPdf(resource, id, user);
};

exports.query = async function ({ limit, after, before, status, tags, ids, user} = {}) {
    /**
     *
     * Retrieve Boletos
     *
     * Receive a generator of Boleto objects previously created in the Stark Bank API
     *
     * Parameters (optional):
     * limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
     * after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
     * before [string, default null] date filter for objects only before specified date. ex: '2020-03-10'
     * status [string, default null]: filter for status of retrieved objects. ex: 'paid' or 'registered'
     * tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
     * ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
     * user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * generator of Boleto objects with updated attributes
     *
     */
    let query = {
        limit: limit,
        after: after,
        before: before,
        status: status,
        tags: tags,
        ids: ids,
    };
    return rest.getList(resource, query, user);
};

exports.delete = async function (id, {user} = {}) {
    /**
     *
     * Delete a Boleto entity
     *
     * Delete a Boleto entity previously created in the Stark Bank API
     *
     * Parameters (required):
     * id [string]: Boleto unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * user [Project object]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * deleted Boleto with updated attributes
     *
     */
    return rest.deleteId(resource, id, user);
};