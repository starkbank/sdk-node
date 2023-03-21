const SubResource = require('../utils/subResource.js').SubResource


class UtilityPreview extends SubResource {
    /**
     * 
     * UtilityPreview object
     * 
     * @description A UtilityPreview is used to get information from a Utility Payment you received to check the information before the payment.
     * 
     * Attributes:
     * @param amount [int]: final amount to be paid. ex: 23456 (= R$ 234.56)
     * @param name [string]: beneficiary full name. ex: 'Light Company'
     * @param description [string]: utility payment description. ex: 'Utility Payment - Light Company'
     * @param line [string]: Number sequence that identifies the payment. ex: '82660000002 8 44361143007 7 41190025511 7 00010601813 8'
     * @param barCode [string]: Bar code number that identifies the payment. ex: '82660000002443611430074119002551100010601813'
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

exports.subResource = {'class': new UtilityPreview, 'name': 'UtilityPreview'}
