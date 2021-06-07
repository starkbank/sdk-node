# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to the following versioning pattern:

Given a version number MAJOR.MINOR.PATCH, increment:

- MAJOR version when the **API** version is incremented. This may include backwards incompatible changes;
- MINOR version when **breaking changes** are introduced OR **new functionalities** are added in a backwards compatible manner;
- PATCH version when backwards compatible bug **fixes** are implemented.


## [Unreleased]
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
- Bad "+" char URL encoding on BrcodePreview

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
- DictKey resource to get PIX key's parameters
- PIX support in Transfer resource
- BrcodePayment and BrcodePreview support to pay static and dynamic PIX QR Codes

## [2.1.0] - 2020-10-28
### Added
- BoletoHolmes to investigate boleto status according to CIP

## [2.0.1] - 2020-10-22
### Fixed
- Fixed "decamelize" dependency

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
- "receiver_name" & "receiver_tax_id" properties to Boleto entities

## [0.3.1] - 2020-05-05
### Fixed
- Docstrings

## [0.3.0] - 2020-05-04
### Added
- "balance" property to Transaction entities

## [0.2.0] - 2020-04-29
### Added
- "discounts" property to Boleto entities

## [0.1.0] - 2020-04-17
### Added
- Full Stark Bank API v2 compatibility
