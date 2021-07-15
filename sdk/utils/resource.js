const SubResource = require('./subResource.js').SubResource


class Resource extends SubResource {

    constructor(id) {
        super()
        this.id = id ? id.toString() : null;
    }
}

exports.Resource = Resource;
