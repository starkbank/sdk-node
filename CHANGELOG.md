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
- ids parameter to transaction.query 

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
