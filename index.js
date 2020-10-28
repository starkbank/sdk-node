exports.version = '2.1.0';

exports.cache = {};
exports.user = null
exports.language = "en-US"

// Modules
exports.transaction = require('./sdk/transaction');
exports.balance = require('./sdk/balance');
exports.boleto = require('./sdk/boleto');
exports.boletoHolmes = require('./sdk/boletoHolmes');
exports.invoice = require('./sdk/invoice');
exports.transfer = require('./sdk/transfer');
exports.boletoPayment = require('./sdk/boletoPayment');
exports.utilityPayment = require('./sdk/utilityPayment');
exports.paymentRequest = require('./sdk/paymentRequest');
exports.webhook = require('./sdk/webhook');
exports.event = require('./sdk/event');
exports.key = require('./sdk/key.js');
exports.error = require('./sdk/error.js');


// Classes
exports.Project = require('./sdk/user').Project;
exports.Transaction = exports.transaction.Transaction;
exports.Balance = exports.balance.Balance;
exports.Boleto = exports.boleto.Boleto;
exports.BoletoHolmes = exports.boletoHolmes.BoletoHolmes;
exports.Invoice = exports.invoice.Invoice;
exports.BoletoPayment = exports.boletoPayment.BoletoPayment;
exports.UtilityPayment = exports.utilityPayment.UtilityPayment;
exports.PaymentRequest = exports.paymentRequest.PaymentRequest;
exports.Transfer = exports.transfer.Transfer;
exports.Webhook = exports.webhook.Webhook;
exports.Event = exports.event.Event;
