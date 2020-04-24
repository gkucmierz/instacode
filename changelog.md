
# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Fixed
- Avoid memory leaks in case of much output data
### Changed
- Better Output stringify

## [1.0.1] - 2020-01-12
### Fixed
- Throttle data posted from webworker to avoid interface blocking.
- Limit maximum output size.

## [1.0.0] - 2020-01-04
### Added
- Ability to run js code by [@gkucmierz](https://github.com/gkucmierz)
- Build app for OS X.
