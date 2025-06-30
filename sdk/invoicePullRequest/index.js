const invoicePullRequest = require('./invoicePullRequest.js');

exports.log = require('./log');
exports.create = invoicePullRequest.create;
exports.get = invoicePullRequest.get;
exports.query = invoicePullRequest.query;
exports.page = invoicePullRequest.page;
exports.delete = invoicePullRequest.delete;
exports.InvoicePullRequest = invoicePullRequest.InvoicePullRequest;
