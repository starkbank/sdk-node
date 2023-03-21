const SubResource = require('../utils/subResource.js').SubResource


class TaxPreview extends SubResource {
    /**
     * 
     * TaxPreview object
     * 
     * @description A TaxPreview is used to get information from a Tax Payment you received to check the information before the payment.
     * 
     * Attributes (return-only):
     * @param amount [int]: final amount to be paid. ex: 23456 (= R$ 234.56)
     * @param name [string]: beneficiary full name. ex: 'Iron Throne'
     * @param description [string]: tax payment description. ex: 'ISS Payment - Iron Throne'
     * @param line [string]: Number sequence that identifies the payment. ex: '85660000006 6 67940064007 5 41190025511 7 00010601813 8'
     * @param barCode [string]: Bar code number that identifies the payment. ex: '85660000006679400640074119002551100010601813'
     * 
     */
    constructor(amount, name, description, line, barCode) 
    {
        super();
        this.amount = amount;
        this.name = name;
        this.description = description;
        this.line = line;
        this.barCode = barCode;
    }
}

exports.subResource = {'class': new TaxPreview, 'name': 'TaxPreview'}
