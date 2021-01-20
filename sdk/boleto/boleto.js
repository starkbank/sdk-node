const rest = require('../utils/rest.js');
const check = require('../utils/check.js');
const Resource = require('../utils/resource.js').Resource


class Boleto extends Resource {
    /**
     *
     * Boleto object
     *
     * @description When you initialize a Boleto, the entity will not be automatically
     * sent to the Stark Bank API. The 'create' function sends the objects
     * to the Stark Bank API and returns the list of created objects.
     *
     * Parameters (required):
     * @param amount [integer]: Boleto value in cents. Minimum = 200 (R$2,00). ex: 1234 (= R$ 12.34)
     * @param name [string]: payer full name. ex: 'Anthony Edward Stark'
     * @param taxId [string]: payer tax ID (CPF or CNPJ) with or without formatting. ex: '01234567890' or '20.018.183/0001-80'
     * @param streetLine1 [string]: payer main address. ex: Av. Paulista, 200
     * @param streetLine2 [string]: payer address complement. ex: Apto. 123
     * @param district [string]: payer address district / neighbourhood. ex: Bela Vista
     * @param city [string]: payer address city. ex: Rio de Janeiro
     * @param stateCode [string]: payer address state. ex: GO
     * @param zipCode [string]: payer address zip code. ex: 01311-200
     *
     * Parameters (optional):
     * @param due [string, default today + 2 days]: Boleto due date in ISO format. ex: 2020-04-30
     * @param fine [float, default 0.0]: Boleto fine for overdue payment in %. ex: 2.5
     * @param interest [float, default 0.0]: Boleto monthly interest for overdue payment in %. ex: 5.2
     * @param overdueLimit [integer, default 59]: limit in days for payment after due date. ex: 7 (max: 59)
     * @param receiverName [string]: receiver (Sacador Avalista) full name. ex: 'Anthony Edward Stark'
     * @param receiverTaxId [string]: receiver (Sacador Avalista) tax ID (CPF or CNPJ) with or without formatting. ex: '01234567890' or '20.018.183/0001-80'
     * @param descriptions [list of dictionaries, default null]: list of dictionaries with 'text':string and (optional) 'amount':int pairs
     * @param discounts [list of dictionaries, default null]: list of dictionaries with 'percentage':float and 'date':string pairs
     * @param tags [list of strings]: list of strings for tagging
     *
     * Attributes (return-only):
     * @param id [string, default null]: unique id returned when Boleto is created. ex: '5656565656565656'
     * @param fee [integer, default null]: fee charged when Boleto is paid. ex: 200 (= R$ 2.00)
     * @param line [string, default null]: generated Boleto line for payment. ex: '34191.09008 63571.277308 71444.640008 5 81960000000062'
     * @param barCode [string, default null]: generated Boleto bar-code for payment. ex: '34195819600000000621090063571277307144464000'
     * @param status [string, default null]: current Boleto status. ex: 'registered' or 'paid'
     * @param created [string, default null]: creation datetime for the Boleto. ex: '2020-03-10 10:30:00.000'
     * @param ourNumber [string, default null]: Reference number registered at the settlement bank. ex:“10131474”
     *
     */
    constructor({
                    amount, name, taxId, streetLine1, streetLine2, district, city, stateCode, zipCode,
                    due = null, fine = null, interest = null, overdueLimit = null, receiverName = null,
                    receiverTaxId = null, tags = null, descriptions = null, discounts = null, id = null,
                    fee = null, line = null, barCode = null, status = null,
                    created = null, ourNumber = null
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
        this.receiverName = receiverName;
        this.receiverTaxId = receiverTaxId;
        this.tags = tags;
        this.descriptions = descriptions;
        this.discounts = discounts;
        this.fee = fee;
        this.line = line;
        this.barCode = barCode;
        this.status = status;
        this.created = created;
        this.ourNumber = ourNumber;
    }
}

exports.Boleto = Boleto;
let resource = {'class': exports.Boleto, 'name': 'Boleto'};

exports.create = async function (boletos, {user} = {}) {
    /**
     *
     * Create Boletos
     *
     * @description Send a list of Boleto objects for creation in the Stark Bank API
     *
     * Parameters (required):
     * @param boletos [list of Boleto objects]: list of Boleto objects to be created in the API
     *
     * Parameters (optional):
     * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns list of Boleto objects with updated attributes
     *
     */
    return rest.post(resource, boletos, user);
};

exports.get = async function (id, {user} = {}) {
    /**
     *
     * Retrieve a specific Boleto
     *
     * @description Receive a single Boleto object previously created in the Stark Bank API by passing its id
     *
     * Parameters (required):
     * @param id [string]: object unique id. ex: '5656565656565656'
     * 
     * Parameters (optional):
     * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
     * 
     * Return:
     * @returns Boleto object with updated attributes
     *
     */
    return rest.getId(resource, id, user);
};

exports.pdf = async function (id, { layout, hiddenFields, user } = {}) {
    /**
     *
     * Retrieve a specific Boleto pdf file
     *
     * @description Receive a single Boleto pdf file generated in the Stark Bank API by passing its id.
     *
     * Parameters (required):
     * @param id [string]: object unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * @param layout [string, default 'default']: Layout specification. Available options are 'default' and 'booklet'
     * @param hiddenFields [list of strings, default null]: List of string fields to be hidden in Boleto pdf. ex: ["customerAddress"]
     * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns Boleto pdf file
     *
     */
    return rest.getPdf(resource, id, { layout: layout, hiddenFields: hiddenFields }, user);
};

exports.query = async function ({ limit, after, before, status, tags, ids, user} = {}) {
    /**
     *
     * Retrieve Boletos
     *
     * @description Receive a generator of Boleto objects previously created in the Stark Bank API
     *
     * Parameters (optional):
     * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
     * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
     * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
     * @param status [string, default null]: filter for status of retrieved objects. ex: 'paid' or 'registered'
     * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
     * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
     * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns generator of Boleto objects with updated attributes
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
     * @description Delete a Boleto entity previously created in the Stark Bank API
     *
     * Parameters (required):
     * @param id [string]: Boleto unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns deleted Boleto object
     *
     */
    return rest.deleteId(resource, id, user);
};