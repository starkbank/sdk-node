const rest = require('../utils/rest.js');
const check = require('../utils/check.js');
const Resource = require('../utils/resource.js').Resource;

class BrcodePayment extends Resource {
    /**
     *
     * BrcodePayment object
     *
     * @description When you initialize a BrcodePayment, the entity will not be automatically
     * created in the Stark Bank API. The 'create' function sends the objects
     * to the Stark Bank API and returns the list of created objects.
     * 
     * ## Parameters (required):
     * @param brcode [string]: String loaded directly from the QRCode or copied from the invoice. ex: "00020126580014br.gov.bcb.pix0136a629532e-7693-4846-852d-1bbff817b5a8520400005303986540510.005802BR5908T'Challa6009Sao Paulo62090505123456304B14A"
     * @param taxId [string]: receiver tax ID (CPF or CNPJ) with or without formatting. ex: '01234567890' or '20.018.183/0001-80'
     * @param description [string]: Text to be displayed in your statement (min. 10 characters). ex: 'payment ABC'
     * 
     * ## Parameters (optional):
     * @param amount [int, default null]: amount automatically calculated from line or barCode. ex: 23456 (= R$ 234.56)
     * @param scheduled [string, default now]: payment scheduled date or datetime. ex: '2020-11-25T17:59:26.249976+00:00'
     * @param tags [list of strings, default null]: list of strings for tagging
     * 
     * ## Attributes (return-only):
     * @param id [string, default null]: unique id returned when payment is created. ex: '5656565656565656'
     * @param name [string, default null]: receiver name. ex: 'Jon Snow'
     * @param status [string, default null]: current payment status. ex: 'success' or 'failed'
     * @param type [string, default null]: brcode type. ex: 'static' or 'dynamic'
     * @param fee [integer, default null]: fee charged when the brcode payment is created. ex: 200 (= R$ 2.00)
     * @param updated [string, default null]: latest update datetime for the payment. ex: '2020-11-25T17:59:26.249976+00:00'
     * @param created [string, default null]: creation datetime for the payment. ex: '2020-11-25T17:59:26.249976+00:00'
     *
     */
    constructor({
                  brcode, taxId, description, amount = null, scheduled = null, tags = null,
                  id = null, name = null, status = null, type = null, fee = null, updated = null, created = null
    }) {
      super(id);
      this.brcode = brcode;
      this.taxId = taxId;
      this.name = name;
      this.description = description;
      this.amount = amount;
      this.scheduled = check.datetime(scheduled);
      this.tags = tags;
      this.id = id;
      this.status = status;
      this.type = type;
      this.fee = fee;
      this.updated = check.date(updated);
      this.created = check.date(created);
    }
}

exports.BrcodePayment = BrcodePayment;
let resource = {'class': exports.BrcodePayment, 'name': 'BrcodePayment'};

exports.create = async function (payments, {user} = {}) {
  /**
   *
   * Create BrcodePayments
   *
   * @description Send a list of BrcodePayment objects for creation in the Stark Bank API
   *
   * Parameters (required):
   * @param payments [list of BrcodePayment objects]: list of BrcodePayment objects to be created in the API
   *
   * Parameters (optional):
   * @param user [Project object]: Project object. Not necessary if starkbank.user was set before function call
   *
   * Return:
   * @returns list of BrcodePayment objects with updated attributes
   *
   */
  return rest.post(resource, payments, user);
};

exports.get = async function (id, {user} = {}) {
  /**
   *
   * Retrieve a specific BrcodePayment
   *
   * @description Receive a single BrcodePayment object previously created in the Stark Bank API by passing its id
   *
   * Parameters (required):
   * @param id [string]: object unique id. ex: '5656565656565656'
   * 
   * Parameters (optional):
   * @param user [Project object]: Project object. Not necessary if starkbank.user was set before function call
   * 
   * Return:
   * @returns BrcodePayment object with updated attributes
   *
   */
  return rest.getId(resource, id, user);
};

exports.pdf = async function (id, {user} = {}) {
  /**
   *
   * Retrieve a specific BrcodePayment pdf file
   *
   * @description Receive a single BrcodePayment pdf file generated in the Stark Bank API by passing its id.
   *
   * Parameters (required):
   * @param id [string]: object unique id. ex: '5656565656565656'
   *
   * Parameters (optional):

   * @param user [Project object]: Project object. Not necessary if starkbank.user was set before function call
   *
   * Return:
   * @returns BrcodePayment pdf file
   *
   */
  return rest.getPdf(resource, id, null, user);
};

exports.query = async function ({ limit, after, before, status, tags, ids, user} = {}) {
  /**
   *
   * Retrieve BrcodePayments
   *
   * @description Receive a generator of BrcodePayment objects previously created in the Stark Bank API
   *
   * Parameters (optional):
   * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
   * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
   * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
   * @param status [string, default null]: filter for status of retrieved objects. ex: 'success'
   * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
   * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
   * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
   *
   * Return:
   * @returns generator of BrcodePayment objects with updated attributes
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

exports.update = function (id, {status, user} = {}) {
  /**
   *
   * Update BrcodePayment entity
   *
   * @description Update BrcodePayment by passing id.
   *
   * Parameters (required):
   * @param id [string]: BrcodePayment id. ex: '5656565656565656'
   *
   * Parameters (optional):
   * @param status        [string]: If the BrcodePayment hasn't been paid yet, you may cancel it by passing 'canceled' in the status
   * @param user          [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
   *
   * Return:
   * @returns target BrcodePayment with updated attributes
   *
   */
  let payload = {
      status:         status,
  };
  return rest.patchId(resource, id, payload, user);
};
