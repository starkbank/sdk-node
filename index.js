exports.version = '2.22.0';

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
exports.corporateCard = require('./sdk/corporateCard')
exports.corporateWithdrawal = require('./sdk/corporateWithdrawal')
exports.corporateTransaction = require('./sdk/corporateTransaction')
exports.corporatePurchase = require('./sdk/corporatePurchase');
exports.corporateInvoice = require('./sdk/corporateInvoice');
exports.corporateHolder = require('./sdk/corporateHolder'); 
exports.corporateRule = require('./sdk/corporateRule');
exports.cardMethod = require('./sdk/cardMethod');
exports.merchantCategory = require('./sdk/merchantCategory')
exports.merchantCountry = require('./sdk/merchantCountry')
exports.transaction = require('./sdk/transaction');
exports.balance = require('./sdk/balance');
exports.corporateBalance = require('./sdk/corporateBalance')
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
exports.CorporateCard = exports.corporateCard.CorporateCard;
exports.CorporateWithdrawal = exports.corporateWithdrawal.CorporateWithdrawal;
exports.CorporateTransaction = exports.corporateTransaction.CorporateTransaction;
exports.CorporatePurchase = exports.corporatePurchase.CorporatePurchase;
exports.CorporateInvoice = exports.corporateInvoice.CorporateInvoice;
exports.Permission = exports.corporateHolder.Permission;
exports.CorporateHolder = exports.corporateHolder.CorporateHolder;
exports.CorporateRule = exports.corporateRule.CorporateRule;
exports.CardMethod = exports.cardMethod.CardMethod;
exports.MerchantCategory = exports.merchantCategory.MerchantCategory;
exports.MerchantCountry = exports.merchantCountry.MerchantCountry;
exports.Project = require('./sdk/user').Project;
exports.Organization = require('./sdk/user').Organization;
exports.Transaction = exports.transaction.Transaction;
exports.Balance = exports.balance.Balance;
exports.CorporateBalance = exports.corporateBalance.CorporateBalance
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
