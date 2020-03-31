const Ecdsa = require('@starkbank/ecdsa');
const rest = require('../../utils/rest.js');
const error = require('../../utils/error.js');

class Event {
    constructor({created=null, delivered=null, subscription=null, log = null, id=null}) {
        this.log = log;
        this.created = created; // TODO check datetime
        this.delivered = delivered; // TODO check datetime
        this.subscription = subscription;
        this.id = id;
    }
}

exports.Event = Event;
let resource = exports.Event;

function verifySignature(content, signature, user = null, refresh = false) {
    signature = Ecdsa.Signature.fromBase64(signature);
    let publicKey = starkbank.cache['starkbank-public-key'];
    if (!publicKey || refresh) {
        let pem = rest.getPublicKey(user);
        publicKey = Ecdsa.PublicKey.fromPem(pem);
        starkbank.cache['starkbank-public-key'] = publicKey;
    }
    return Ecdsa.Ecdsa.verify(content, signature, publicKey);
}

exports.get = async function (id, user = null) {
    return rest.getId(resource, id, user);
};

exports.query = async function ({limit = null, status = null, tags = null, ids = null, after = null, before = null}, user = null) {
    let query = {
        limit: limit,
        status: status,
        tags: tags,
        ids: ids,
        after: after,
        before: before,
    };
    return rest.getList(resource, query, user);
};

exports.delete = async function (id, user = null) {
    return rest.deleteId(resource, id, user);
};

exports.setDelivered = function (id, user = null) {
    return rest.patchId(resource, id, user);
};

exports.parse = async function ({content, signature}, user = null) {

    let event = Object.assign(new Event({}), JSON.parse(content));
    if (verifySignature(content, signature, user)) {
        return event;
    }
    if (verifySignature(content, signature, user, true)) {
        return event;
    }
    throw new error.InvalidSignatureError('Provided signature and content do not match Stark Bank public key');
};