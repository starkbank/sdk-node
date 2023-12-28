const SubResource = require('core-node').SubResource;

class Permission extends SubResource {
    /**
    * 
    * corporateholder.Permission object
    * 
    * @description Permission object represents access granted to an user for a particular cardholder
    * 
    * Parameters (optional):
    * @param ownerId [string, default null]: owner unique id. ex: "5656565656565656"
    * @param ownerType [string, default null]: owner type. ex: "project"
    * 
    * Attributes (return only):
    * @return ownerEmail [string]: email address of the owner. ex: "tony@starkbank.com
    * @return ownerName [string]: name of the owner. ex: "Tony Stark"
    * @return ownerPictureUrl [string]: Profile picture Url of the owner. ex: "https://storage.googleapis.com/api-ms-workspace-sbx.appspot.com/pictures/member/6227829385592832?20230404164942"
    * @return ownerStatus [string]: current owner status. ex: "active", "blocked", "canceled"
    * @return created [string]: creation datetime for the Permission. ex: '2020-03-10 10:30:00.000'
    * 
    */

    constructor({
        ownerId = null, ownerType = null, ownerEmail = null, ownerName = null, ownerPictureUrl = null, ownerStatus = null, created = null
    }) {
        super();
        this.ownerEmail = ownerEmail;
        this.ownerId = ownerId;
        this.ownerName = ownerName;
        this.ownerPictureUrl = ownerPictureUrl;
        this.ownerStatus = ownerStatus;
        this.ownerType = ownerType;
        this.created = created;
    } 

}

exports.Permission = Permission;
exports.resource = {'class': exports.Permission, 'name': 'Permission'};
