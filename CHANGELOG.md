# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to the following versioning pattern:

Given a version number MAJOR.MINOR.PATCH, increment:

- MAJOR version when the **API** version is incremented. This may include backwards incompatible changes;
- MINOR version when **breaking changes** are introduced OR **new functionalities** are added in a backwards compatible manner;
- PATCH version when backwards compatible bug **fixes** are implemented.


## [Unreleased]
### Added
- softDescriptor attribute to MerchantSession resource
### Fixed
- language attribute
- parse functions

## [2.37.0] - 2025-10-07
### Added
- Split resource
- SplitLog resource
- SplitProfile resource
- SplitProfileLog resource
- SplitReceiver resource
- SplitReceiverLog resource
### Fixed
- MerchantSession user parameter

## [2.36.0] - 2025-09-30
### Changed
- The create method from the Transaction resource is now deprecated

## [2.35.0] - 2025-09-25
### Added
- InvoicePullSubscription and InvoicePullRequest TypeScript support
### Fixed
- InvoicePullSubscription query params

## [2.34.0] - 2025-07-11
### Added
- reversalDisplayDescription to Deposit resource

## [2.33.0] - 2025-07-08
### Added
- InvoicePullSubscription and InvoicePullRequest resources

## [2.32.0] - 2025-04-17
### Added
- PDF method for DepositLog resource

## [2.31.0] - 2025-03-27
### Added
- MerchantCard and MerchantInstallment resources
- create and update methods to MerchantPurchase
### Fixed
- MerchantSession tests
- MerchantPurchase tests
- MerchantSession required parameters

## [2.30.0] - 2025-03-13
### Added
- rules parameter on DynamicBrcode resource
- displayDescription parameter on DynamicBrcode resource

## [2.29.1] - 2024-07-22
### Added
- merchantSession and merchantPurchase README.md
### Fixed
- merchantSession tests
- merchantSession required parameters

## [2.29.0] - 2024-07-21
### Added
- types to merchantSession and merchantPurchase resources

## [2.28.0] - 2024-07-18
### Added
- request methods to typescript
- query and get methods to merchantSession resource
### Fixed
- merchantPurchase log

## [2.27.0] - 2024-07-16
### Added
- query and get methods to merchantPurchase resource

## [2.26.0] - 2024-07-15
### Added
- merchantSession and merchantSessionPurchase resources
### Changed
- core version

## [2.25.0] - 2024-07-03
### Added
- request methods
### Changed
- core version

## [2.24.1] - 2024-05-09
### Changed
- core version to v0.0.5
### Fixed
- MerchantCategory subResource import 

## [2.24.0] - 2024-05-02
### Added
- displayDescription parameter to transfer, invoice and deposit resources

## [2.23.3] - 2024-04-01
### Fixed
- tags types parameter reference
- optional parameters types

## [2.23.2] - 2024-02-21
### Changed
- core version to v0.0.4

## [2.23.1] - 2024-01-12
### Fixed
- user export to rest resource

## [2.23.0] - 2024-01-08
### Changed
- internal structure to use starkcore as a dependency
### Fixed
- sdk version

## [2.22.0] - 2023-12-15
### Added
- update types to Deposit resource
### Fixed
- Readme Deposit resource 

## [2.21.0] - 2023-11-17
### Added
- update function to Deposit resource

## [2.20.0] - 2023-09-18
### Removed
- accountCreated, created and owned attributes to DictKey resource 
- accountNumber and branchCode attributes to PaymentPreview resource 
### Changed
- accountNumber and branchCode attributes to DictKey resource
### Fixed
- accountType docstring attribute to DictKey resource

## [2.19.0] - 2023-06-21
### Added
- rules types to Invoice resource
- Rule object types

## [2.18.0] - 2023-06-20
### Added
- CorporateBalance resource
- CorporateCard resource
- CorporateHolder resource
- CorporateInvoice resource
- CorporatePurchase resource
- CorporateRule resource
- CorporateTransaction resource
- CorporateWithdrawal resource
- Invoice resource

## [2.17.0] - 2023-03-22
### Fixed
- pdf function on boletoPayment, darfPayment, invoice, invoice.Log, taxPayment, transfer and utilityPayment
### Added
- metadata attribute to Transfer resource
- missing parameters to the SDK resources
- status, organizationId, created and pictureUrl attribute to Workspace resource
- status parameter to update method on Workspace resource
- workspaceId attribute to Boleto resource
- description attribute to PaymentRequest resource
- updated attribute to BoletoHolmes.Log resource
- updated and type attribute to UtilityPayment resource
### Removed
- deprecated BrcodePreview resource

## [2.16.0] - 2023-01-31
### Added
- pictureUrl attribute to DynamicBrcode resource
### Fixed
- BrcodePayment.Rule type on BrcodePayment resource

## [2.15.0] - 2023-01-16
### Added
- DynamicBrcode resource

## [2.14.0] - 2023-01-04
### Added
- rules attribute to Transfer resource
- Transfer.Rule sub-resource
- rules attribute to BrcodePayment resource
- BrcodePayment.Rule sub-resource

## [2.13.2] - 2022-12-15
### Fixed
- Invoice.Discount error when an empty list was received

## [2.13.1] - 2022-11-03
### Fixed
- missing "types" folder in the final package

## [2.13.0] - 2022-09-02
### Fixed
- unset variables for Typescript compatibility
### Added
- setUser, getUser, setLanguage and getLanguage functions
- types for Organization and Project parameters

## [2.12.0] - 2022-07-04
### Added
- type files to support TypeScript

## [2.11.0] - 2022-06-22
### Added
- picture and pictureType parameters to Workspace.update method

## [2.10.1] - 2021-11-12
### Added
- 'transactionIds' property to UtilityPayment resource

## [2.10.0] - 2021-11-12
### Added
- 'transactionIds' property to BoletoPayment and TaxPayment resources
- 'fee', 'transactionIds', 'created' and 'updated' properties to DarfPayment resource
- datetime validation to 'created' and 'updated' fields

## [2.9.2] - 2021-11-10
### Changed
- starkbank-ecdsa library version to 1.1.4

## [2.9.1] - 2021-11-04
### Changed
- starkbank-ecdsa library version to 1.1.3

## [2.9.0] - 2021-09-04
### Added
- Support for scheduled invoices, which will display discounts, fine, interest, etc. on the users banking interface when dates are used instead of datetimes

## [2.8.0] - 2021-07-30
### Added
- PaymentPreview resource to preview multiple types of payments before confirmation: BrcodePreview, BoletoPreview, UtilityPreview and TaxPreview

## [2.7.0] - 2021-07-20
### Added
- 'payment' account type for Pix related resources
- Transfer.description property to allow control over corresponding Transaction descriptions
- 'link' property to Invoice resource
- missing parameters to Boleto, DictKey, Invoice, Transaction, UtilityPayment and Workspace resources
- Invoice.Payment sub-resource to allow retrieval of invoice payment information
- pdf method for retrieving PDF receipts from reversed invoice logs
- Event.Attempt sub-resource to allow retrieval of information on failed webhook event delivery attempts
- page functions as a manual-pagination alternative to queries 
- Institution resource to allow query of institutions recognized by the Brazilian Central Bank for Pix and TED transactions
- DarfPayment resource to allow DARF tax payment without bar code

## [2.6.0] - 2021-06-06
### Fixed
- Event query by isDelivered
- Event async update
### Added
- workspace.update() to allow Workspace parameter updates

## [2.5.2] - 2021-04-23
### Fixed
- PDF buffer fetch error treatment

## [2.5.1] - 2021-03-08
### Fixed
- Bad '+' char URL encoding on BrcodePreview

## [2.5.0] - 2021-02-05
### Added
- Event.workspaceId property to multiple Workspace Webhook identification

## [2.4.0] - 2021-01-21
### Added
- Transfer.accountType property to allow 'checking', 'salary' or 'savings' account specification
- Transfer.externalId property to allow users to take control over duplication filters

## [2.3.0] - 2021-01-20
### Added
- Organization user
- Workspace resource

## [2.2.0] - 2020-11-23
### Added
- Invoice resource to load your account with dynamic QR Codes
- Deposit resource to receive transfers passively
- DictKey resource to get Pix key's parameters
- Pix support in Transfer resource
- BrcodePayment and BrcodePreview support to pay static and dynamic Pix QR Codes
- TaxPayment object and function calls to allow payment of DAS, DARF and ISS taxes

## [2.1.0] - 2020-10-28
### Added
- BoletoHolmes to investigate boleto status according to CIP

## [2.0.1] - 2020-10-22
### Fixed
- Fixed 'decamelize' dependency

## [2.0.0] - 2020-10-19
### Added
- ids parameter to transaction.query
- ids parameter to transfer.query
- hiddenFields parameter to boleto.pdf
- ourNumber attribute to Boleto
- PaymentRequest resource to pass payments through manual approval flow

## [0.6.0] - 2020-07-12
### Added
- transfer.scheduled parameter to allow Transfer scheduling
- starkbank.transfer.delete to cancel scheduled Transfers
- Transaction query by tags

## [0.5.1] - 2020-06-12
### Change
- Change request library from Got to Axios for better compatibility

## [0.5.0] - 2020-06-05
### Added
- Boleto PDF layout option
- Global error language option
- Transfer query taxId filter
### Change
- Test user credentials to environment variable instead of hard-code

## [0.4.0] - 2020-05-12
### Added
- 'receiver_name' & 'receiver_tax_id' properties to Boleto entities

## [0.3.1] - 2020-05-05
### Fixed
- Docstrings

## [0.3.0] - 2020-05-04
### Added
- 'balance' property to Transaction entities

## [0.2.0] - 2020-04-29
### Added
- 'discounts' property to Boleto entities

## [0.1.0] - 2020-04-17
### Added
- Full Stark Bank API v2 compatibility
