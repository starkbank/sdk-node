const SubResource = require('../../utils/subResource').SubResource


class Metadata extends SubResource {
    /**
     *
     * Transfer.Metadata object
     *
     * @description The Transfer.Metadata object contains additional information about the Transfer object.
     *
     * Parameters (required):
     * @param authentication [string]: Central Bank's unique ID for Pix transactions (EndToEndID). ex: "E200181832023031715008Scr7tD63TS"
     * 
     */
    constructor({authentication}) {
        super();
        this.authentication = authentication;
    }
}

exports.Metadata = Metadata;
exports.subResource = {'class': exports.Metadata, 'name': 'Metadata'};
