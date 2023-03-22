exports.version = '2.17.0';

exports.cache = {};
exports.user = null;
exports.language = "en-US";

exports.setUser = function (user) {
    exports.user = user;
}

exports.getUser = function () {
    return exports.user;
}

exports.setLanguage = function (language) {
    let acceptedLanguages = ["en-US", "pt-BR"];
    if (!acceptedLanguages.includes(language)) {
        throw new Exception("language must be one of " . join(", ", acceptedLanguages));
    }
    exports.language = language;
}

exports.getLanguage = function () {
    return exports.language
}

// Modules
exports.transaction = require('./sdk/transaction');
exports.balance = require('./sdk/balance');
exports.boleto = require('./sdk/boleto');
exports.boletoHolmes = require('./sdk/boletoHolmes');
exports.invoice = require('./sdk/invoice');
exports.dictKey = require('./sdk/dictKey');
exports.dynamicBrcode = require('./sdk/dynamicBrcode');
exports.deposit = require('./sdk/deposit');
exports.brcodePayment = require('./sdk/brcodePayment');
exports.transfer = require('./sdk/transfer');
exports.boletoPayment = require('./sdk/boletoPayment');
exports.utilityPayment = require('./sdk/utilityPayment');
exports.paymentRequest = require('./sdk/paymentRequest');
exports.taxPayment = require('./sdk/taxPayment');
exports.darfPayment = require('./sdk/darfPayment');
exports.paymentPreview = require('./sdk/paymentPreview');
exports.webhook = require('./sdk/webhook');
exports.workspace = require('./sdk/workspace');
exports.event = require('./sdk/event');
exports.institution = require('./sdk/institution')
exports.key = require('./sdk/key.js');
exports.error = require('./sdk/error.js');
exports.organization = require('./sdk/user/organization.js')


// Classes
exports.Project = require('./sdk/user').Project;
exports.Organization = require('./sdk/user').Organization;
exports.Transaction = exports.transaction.Transaction;
exports.Balance = exports.balance.Balance;
exports.Boleto = exports.boleto.Boleto;
exports.BoletoHolmes = exports.boletoHolmes.BoletoHolmes;
exports.Invoice = exports.invoice.Invoice;
exports.DictKey = exports.dictKey.DictKey;
exports.DynamicBrcode = exports.dynamicBrcode.DynamicBrcode;
exports.Deposit = exports.deposit.Deposit;
exports.BrcodePayment = exports.brcodePayment.BrcodePayment;
exports.BoletoPayment = exports.boletoPayment.BoletoPayment;
exports.UtilityPayment = exports.utilityPayment.UtilityPayment;
exports.PaymentRequest = exports.paymentRequest.PaymentRequest;
exports.TaxPayment = exports.taxPayment.TaxPayment;
exports.DarfPayment = exports.darfPayment.DarfPayment;
exports.Transfer = exports.transfer.Transfer;
exports.Webhook = exports.webhook.Webhook;
exports.Workspace = exports.workspace.Workspace;
exports.Event = exports.event.Event;
exports.Institution = exports.institution.Institution;
exports.PaymentPreview = exports.paymentPreview.PaymentPreview;
