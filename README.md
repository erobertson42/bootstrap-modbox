# bootstrap-modbox
Native JavaScript wrapper for simple Bootstrap 5 modals.  Provides support for alert, confirm, and prompt modals, as well as advanced custom dialogs.

&nbsp;

## Table of Contents

- [Description](#description)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Documentation](#documentation)
- [Notes](#notes)
- [Copyright and License](#copyright-and-license)


## Description

I know, not *another* JavaScript library for Bootstrap modals, right?

However, I found that existing libraries seem to be no longer updated/supported, are for older versions of Bootstrap, and/or still require jQuery.  So, I decided to write my own for Bootstrap 5, using all native JavaScript and native Bootstrap markup and CSS - there is no custom styling.

I should mention that both the standard and module versions of the library are using [newer JavaScript features](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#browser_compatibility) (as of this writing) which are only supported in more recent versions of the major browsers; like class structures, including private fields and methods.

That said, I have also included a compatibility version of the library transpiled by Babel, if needed.  It targets the versions of all major browsers which first included class support (for specifics, check out the [Grunt configuration file](https://github.com/erobertson42/bootstrap-modbox/blob/main/Gruntfile.js)).  I *did not* go back as far as ES5, because Bootstrap 5 no longer supports it either.


## Requirements

Just [Bootstrap](https://getbootstrap.com/) version 5.0.1 or greater.


## Getting Started

The modbox library can be added to your project in several ways:
- [NPM](https://www.npmjs.com/package/bootstrap-modbox):
	```
	npm i bootstrap-modbox
	```
	Although since it's client-side, if you're not using a bundler (eg. Webpack), you'll also have to copy the necessary `.js` file(s) from `node_modules/bootstrap-modbox/dist` into your project folder structure and include it in your page(s) like the examples below.

- [Unpkg CDN](https://unpkg.com/browse/bootstrap-modbox/):
	```html
	<!-- latest version -->
	<script src="https://unpkg.com/bootstrap-modbox"></script>

	<!-- specific version -->
	<script src="https://unpkg.com/bootstrap-modbox@1.6.0/dist/bootstrap-modbox.min.js"></script>
	```
	```javascript
	// latest version
	import modbox from 'https://unpkg.com/bootstrap-modbox/dist/bootstrap-modbox.esm.min.js';

	// specific version
	import modbox from 'https://unpkg.com/bootstrap-modbox@1.6.0/dist/bootstrap-modbox.esm.min.js';
	```

- Download from [GitHub](https://github.com/erobertson42/bootstrap-modbox/releases):
	```html
	<script src="dist/bootstrap-modbox.min.js"></script>
	```
	```javascript
	import modbox from './dist/bootstrap-modbox.esm.min.js';
	```


## Documentation

Full documentation and examples are available at https://erobertson42.github.io/bootstrap-modbox/.

All of the class modal methods return a Promise, whereas calling the constuctor does not (`new modbox()`).  For `.confirm()` and `.prompt()`, the Promise is resolved when clicking the `okButton`, and rejected when the modal is closed in any other way (`closeButton`, 'X', ESC key, clicking the backdrop, etc).  For `.alert()` and its variants, which only have the single Close button, the Promise is always resolved.

Simple alert box:
```javascript
modbox.alert('Pay attention to the thing.');
```

Alert box with success styling and alternate title (similar methods also exist for `.info()`, `.danger()`, `.warning()`, and `.error()`):
```javascript
modbox.success({
	title: 'Done!',
	body: 'The thing has completed successfully.'
});
```

Confirm box with custom button label:
```javascript
modbox.confirm({
	body: 'Confirm the thing?',
	okButton: {
		label: 'Confirm'
	}
})
.then(() => console.log('Confirm button clicked'))
.catch(() => console.log('Confirm button not clicked'));
```


## Notes

- **Bootstrap ES module:**
	Modbox will automatically attempt to locate a reference to Bootstrap in the global namespace.  If it does not exist, such as when loading Bootstrap as an ES module, you will also need to pass it as a reference to the `modbox.bootstrapModal` property before it can be used.
	```javascript
	import * as bootstrap from '/path/to/bootstrap.esm.min.js';
	import modbox from '/path/to/bootstrap-modbox.esm.min.js';
	modbox.bootstrapModal = bootstrap.Modal;
	```
	... or ...
	```javascript
	import { Modal } from '/path/to/bootstrap.esm.min.js';
	import modbox from '/path/to/bootstrap-modbox.esm.min.js';
	modbox.bootstrapModal = Modal;
	```
	Unfortunately, it is not as simple as automatically importing Bootstrap into the module version of modbox.  The ES standard module system requires a path to the file to be imported.  Meaning if I were to include it, I would have to hardcode the path, and anyone using modbox would either have to use that same path to Bootstrap, or modify the code with their own path - which is obviously not desirable.  Alternatively, if I imported Bootstrap using the specifier syntax (`import * as bootstrap from 'bootstrap'`), then a bundler like webpack would be required and no one could use the ES module version in a vanilla JavaScript environment (it would throw an error).

	A JavaScript [import map](https://github.com/WICG/import-maps/) could work, however, it is currently still an experimental feature and [not supported](https://caniuse.com/import-maps) by all browsers.  For now, the above solution should be sufficient, and I have added a more descriptive error thrown if the `bootstrap` object is not found.

- **Sanitization:**
	This library builds its markup as a string, then uses the `element.insertAdjacentHTML()` method to parse and inject the resulting nodes into the DOM.  There has been some concern shown for other libraries using similar methods (`element.insertHTML`, jQuery `$(element).html()`, etc) that this could be a potential XSS attack vector (eg. user submitted data), considering that custom markup can be passed as a string with some configuration options (title, body, etc).

	I understand this argument in theory, however in practice, I feel it's a non-issue.  It should be the responsibility of each developer to handle such situations.  If you're using user submitted data to build the markup for a modbox, it is on you to make sure the data is clean and safe.  Handling this task is outside the scope of this library.

	So that said, I'm not going to take the time to write and maintain my own sanitizer, nor am I going to add an external dependency.  However, as a compromise, I have added a `sanitizer` option that accepts a function, which can be from an external library like [DOMPurify](https://github.com/cure53/DOMPurify) (for example), should you wish to include/use one on your own.  In addition, the `.prompt()` modal also has an `input.sanitizer` option that can clean the user input before being passed to the Promise resolve function.  See the documentation for more details.

	Please note that if you use software which scans your code for vulnerabilities, the solution above will most likely not satisfy those scans, since markup is still permitted and the sanitizer is optional.


## Copyright and License

&copy; 2021-2022 Eric Robertson and released under the [MIT License](https://github.com/erobertson42/bootstrap-modbox/blob/main/LICENSE).
