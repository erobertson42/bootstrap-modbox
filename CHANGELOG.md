# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this project adheres to [Semantic Versioning](https://semver.org/).


## [1.2.0] - 2021-10-08
### Added
- Ability to set defaults with new `modbox.defaultOptions` and `modbox.defaultButtonOptions` class properties.

### Changed
- GitHub Pages site now uses the compatibility version of bootstrap-modbox to ensure most browsers can view it correctly.
- Updated documentation to reflect changes.

### Removed
- The modal configuration option `defaultButtonLabel` has been removed - use `modbox.defaultButtonOptions.label` instead.


## [1.1.0] - 2021-10-05
### Added
- New `relatedTarget` modal configuration option ([docs](https://erobertson42.github.io/bootstrap-modbox/docs.html#options-relatedTarget)).

### Changed
- Modal events now also pass a reference to the modbox object as a 2nd parameter to the callback functions, as well as set the function context (`this`) to the `.modal` element.
- Hitting the Enter key while the input field has focus on a `.prompt()` modal will simulate a click of the `okButton`.
- Added some ARIA accessibility attributes to the modal markup.
- Updated documentation to reflect changes.

### Fixed
- A `.prompt()` modal could be destroyed before the Promise is resolved, which prevented the input value from being passed to the `resolve()` function.


## [1.0.0] - 2021-10-02
- Initial release