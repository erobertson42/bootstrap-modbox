# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this project adheres to [Semantic Versioning](https://semver.org/).


## [1.6.1] - 2022-05-24
### Changed
- Updated the `getUID()` private method *again*.  It turns out that JavaScript dates aren't precise enough, and it resulted in identical epoch values generated when called multiple times in quick succession.  It now uses a combination of both the old and new methods.

### Fixed
- Fixed an event timing issue in Safari preventing the modal Promise `resolve()` function from firing.


## [1.6.0] - 2022-05-14
### Added
- New `setDefaults()` method to allow independent default options for each modal type ([docs](https://erobertson42.github.io/bootstrap-modbox/docs.html#methods-setDefaults)).

### Changed
- The `getUID()` private method now uses `Date.now()` epoch to guarantee a unique ID.  Previously, getting a duplicate value was highly improbable, but not impossible.


## [1.5.0] - 2022-03-24
### Added
- New optional `bootstrapModal` property to manually define a reference to the Bootstrap Modal class.  Modbox will automatically attempt to locate a reference in the global namespace, and this is only recommended if loading Bootstrap as a module.

### Changed
- Append Bootstrap modal defaults to modbox `defaultOptions` in the constructor as opposed to on initialization to avoid hoisting issues when Bootstrap is loaded as an ES module.


## [1.4.0] - 2022-03-04
### Added
- New `showHeaderClose` modal configuration option which can hide the header close button ("X") ([docs](https://erobertson42.github.io/bootstrap-modbox/docs.html#options-showHeaderClose)).

### Changed
- Setting `title` to `null` or an empty string previously excluded the header markup from the DOM entirely.  Now it is still rendered but hidden, so it is available for future use if needed.  The same behavior applies to the new `showHeaderClose` option.
- Updated documentation to reflect changes.


## [1.3.1] - 2022-02-27
### Changed
- Set the default label for the `closeButton` to actually "Close" (as opposed to "Cancel").  How'd I miss that?


## [1.3.0] - 2022-02-26
### Added
- New `.warning()` alert modal variant.
- New `sanitizer` modal configuration option which can be used to sanitize the modal markup string before parsing and inserting into the DOM ([docs](https://erobertson42.github.io/bootstrap-modbox/docs.html#options-sanitizer)).
- New `sanitizer` input configuration option for `.prompt()` modals which can be used to sanitize user input before being passed to the Promise resolve function ([docs](https://erobertson42.github.io/bootstrap-modbox/docs.html#options-input)).

### Changed
- Safari has now supported [private class methods](https://caniuse.com/mdn-javascript_classes_private_class_methods) for a few versions, so removed the Grunt task that converted them into private field functions (the compatibility file still exists for older browser versions).
- Updated documentation to reflect changes.


## [1.2.1] - 2021-10-23
### Added
- New `message` modal configuration option as an alternative to `body` ([docs](https://erobertson42.github.io/bootstrap-modbox/docs.html#options-message)).

### Changed
- The 2nd argument for the `addButton()` instance method has been renamed from `appendStart` to `swapOrder` to more accurately reflect its behavior.
- Updated documentation to reflect changes.


## [1.2.0] - 2021-10-08
### Added
- Ability to set defaults with new `modbox.defaultOptions` and `modbox.defaultButtonOptions` class properties ([docs](https://erobertson42.github.io/bootstrap-modbox/docs.html#properties-defaultOptions)).

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
