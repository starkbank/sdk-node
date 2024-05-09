const Resource = require('starkcore').Resource;
const {CardMethod} = require('../cardMethod/cardMethod.js');
const {MerchantCategory} = require('../merchantCategory/merchantCategory.js')
const {MerchantCountry} = require('../merchantCountry/merchantCountry.js')
const cardMethodResource = require('../cardMethod/cardMethod.js').resource;
const merchantCountryResource = require('../merchantCountry/merchantCountry.js').resource;
const merchantCategoryResource = require('../merchantCountry/merchantCountry.js').resource;
const parseObjects = require('../utils/parse.js').parseObjects;


class CorporateRule extends Resource {
    /**
    * 
    * CorporateRule object
    * 
    * @descrption The CorporateRule object displays the spending rules of CorporateCards and CorporateHolders created in your Workspace.
    * 
    * Parameters (required):
    * @param name [string]: rule name. ex: "Travel" or "Food"
    * @param amount [integer]: maximum amount that can be spent in the informed interval. ex: 200000 (= R$ 2000.00)
    * 
    * Parameters (optional):
    * @param interval [string, default "lifetime"]: interval after which the rule amount counter will be reset to 0. ex: "instant", "day", "week", "month", "year" or "lifetime"
    * @param schedule [string, default null]: schedule time for user to spend. ex: "every monday, wednesday from 00:00 to 23:59 in America/Sao_Paulo"
    * @param purposes [list of string, default []]: list of strings representing the allowed purposes for card purchases, you can use this to restrict ATM withdrawals. ex: ["purchase", "withdrawal"]
    * @param currencyCode [string, default "BRL"]: code of the currency that the rule amount refers to. ex: "BRL" or "USD"
    * @param categories [list of MerchantCategories, default []]: merchant categories accepted by the rule. ex: [MerchantCategory(code="fastFoodRestaurants")]
    * @param countries [list of MerchantCountries, default []]: countries accepted by the rule. ex: [MerchantCountry(code="BRA")]
    * @param methods [list of CardMethods, default []]: card purchase methods accepted by the rule. ex: [CardMethod(code="magstripe")]
    *
    * Attributes (expanded return-only):
    * @param id [string]: unique id returned when a CorporateRule is created, used to update a specific CorporateRule. ex: "5656565656565656"
    * @param counterAmount [integer]: current rule spent amount. ex: 1000
    * @param currencySymbol [string]: currency symbol. ex: "R$"
    * @param currencyName [string]: currency name. ex: "Brazilian Real"
    */

    constructor({
                    name, amount, id = null, interval = null, schedule = null, purposes = null, currencyCode = null,
                    categories = null, countries = null, methods= null, counterAmount = null, currencySymbol = null,
                    currencyName = null 
                }) {
        super(id);

        this.name = name;
        this.amount = amount;
        this.interval = interval;
        this.schedule = schedule;
        this.purposes = purposes;
        this.currencyCode = currencyCode;
        this.categories = parseObjects(categories, merchantCategoryResource, MerchantCategory);
        this.countries = parseObjects(countries, merchantCountryResource, MerchantCountry);
        this.methods = parseObjects(methods, cardMethodResource, CardMethod);
        this.counterAmount = counterAmount;
        this.currencySymbol = currencySymbol;
        this.currencyName = currencyName;
    }
}

exports.CorporateRule = CorporateRule;
exports.resource = {'class': exports.CorporateRule, 'name': 'CorporateRule'};
