/*
 * bootstrap-modbox - Native JavaScript wrapper for simple Bootstrap 5 modals. Provides support for alert, confirm, and prompt modals, as well as advanced custom dialogs.
 * version: 1.0.0
 * author: Eric Robertson
 * license: MIT
 *
 * https://erobertson42.github.io/bootstrap-modbox/
 */
export default class modbox {

	static version = '1.0.0';

	/* private members */

	#options;
	#modal;
	#modalEl;
	#footer;


	// generate a pseudo-random id
	static #getUID = (prefix = 'modbox-') => {
		return prefix + Math.floor(Math.random() * 1000000);
	}


	// more specific type checking than standard typeof
	static #typeof = (obj) => {
		return (typeof obj === 'object') ? Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() : typeof obj;
	}


	// recursive object merge
	static #deepMerge = (target, source) => {
		const result = { ...target, ...source };

		Object.keys(result).forEach(key => {
			const tProp = target[key];
			const sProp = source[key];

			if (modbox.#typeof(tProp) === 'object' && modbox.#typeof(sProp) === 'object') {
				result[key] = modbox.#deepMerge(tProp, sProp);
			}
		});

		return result;
	}


	// if string passed in as options argument, convert to an object and use as the body value
	static #checkUserOptions = (userOptions) => {
		return (typeof userOptions === 'string') ? { body: userOptions } : userOptions;
	}


	// build custom modal that returns a Promise
	static #buildPromiseModal = (options = {}, type = 'alert') => {
		return new Promise((resolve, reject) => {
			const box = new modbox(options);

			// add buttons to modal
			const btns = [options.closeButton];

			if (['confirm', 'prompt'].includes(type)) {
				let okCallback = () => resolve();

				if (type === 'prompt' && modbox.#typeof(options.input) === 'object') {
					okCallback = () => {
						const inputEl = box.modalEl.querySelector(`#${options.input.id}`);
						const isValid = (options.input._validate === true) ? inputEl.reportValidity() : true;

						if (isValid) {
							box.hide();
							resolve(inputEl.value);
						}
					};
				}

				btns.unshift({
					...options.okButton,
					callback: function(ev, modal) {
						if (typeof options.okButton.callback === 'function') {
							options.okButton.callback.call(this, ev, modal);
						}

						okCallback();
					}
				});
			}

			const [okBtn, closeBtn] = btns.map(btnOptions => box.addButton(btnOptions));

			// settle the Promise if the modal is closed in a way other than clicking the buttons (click X, click backdrop, press ESC, etc)
			box.addEvent('hide', () => {
				if (type === 'alert') {
					resolve();
				}
				else if (['confirm', 'prompt'].includes(type) && document.activeElement !== okBtn) {
					reject();
				}
			});

			box.show();
		});
	}


	#getDefaultButtonOptions = (label = 'Close') => {
		return {
			id: modbox.#getUID('modbox-btn-'),
			label: label,
			style: 'secondary',
			class: '',
			outline: false,
			size: null,
			icon: null,
			title: null,
			disabled: false,
			close: true,
			callback: null
		};
	}


	#buildModal = () => {
		const isDarkStyle = ['primary', 'secondary', 'success', 'danger', 'dark', 'body'].includes(this.#options.style);
		const titleStyle = this.#options.titleStyle || (isDarkStyle ? 'white' : 'dark');
		const closeButtonStyle = `btn-close ${isDarkStyle ? 'btn-close-white' : ''}`;
		let title = '';

		if (this.#options.title) {
			title = `
				<div class="modal-header ${this.#options.style ? `bg-${this.#options.style}` : ''}">
					<h5 class="modal-title text-${titleStyle}">${this.#options.icon ? `<i class="${this.#options.icon} me-3"></i>` : ''}${this.#options.title}</h5>
					<button type="button" class="${closeButtonStyle}" data-bs-dismiss="modal"></button>
				</div>
			`.trim();
		}

		modbox.container.insertAdjacentHTML('beforeend', `
			<div class="modal ${this.#options.fade ? 'fade' : ''}" id="${this.#options.id}" tabindex="-1">
				<div class="modal-dialog ${this.#options.scrollable ? 'modal-dialog-scrollable' : ''} ${this.#options.center ? 'modal-dialog-centered' : ''} ${this.#options.size ? `modal-${this.#options.size}` : ''}">
					<div class="modal-content">
						${title}
						<div class="modal-body">
							${this.#options.body}
						</div>
						<div class="modal-footer ${this.#options.justifyButtons ? `d-flex justify-content-${this.#options.justifyButtons}` : ''}"></div>
					</div>
				</div>
			</div>
		`.trim());

		this.#modalEl = modbox.container.querySelector(`#${this.#options.id}`);
		this.#footer = this.#modalEl.querySelector('.modal-footer');

		// add buttons to modal
		this.#addButtons();
	}


	#addButtons = () => {
		if (!Array.isArray(this.#options.buttons)) {
			this.#options.buttons = [];
		}

		if (this.#options.buttons.length === 0 && this.#options.defaultButton === true) {
			// add default button
			this.#options.buttons = [this.#getDefaultButtonOptions(this.#options.defaultButtonLabel)];
		}
		else {
			// hide footer when there are no buttons
			this.#footer.classList.add('d-none');
		}

		this.#options.buttons.forEach(userBtnOptions => this.addButton(userBtnOptions));
	}


	#addEvents = () => {
		Object.entries(this.#options.events).forEach(([type, fn]) => {
			this.addEvent(type, fn);
		});

		if (this.#options.destroyOnClose === true) {
			this.addEvent('hidden', () => this.destroy());
		}
	}


	/* public members */

	constructor(userOptions = {}) {
		this.#options = {
			// bootstrap modal default options
			...bootstrap.Modal.Default,

			// modbox default options
			id: modbox.#getUID(),
			icon: null,
			style: 'white',
			titleStyle: null,
			title: 'Information',
			body: '',
			size: null,
			center: false,
			fade: true,
			show: false,
			scrollable: true,
			destroyOnClose: false,
			defaultButton: true,
			defaultButtonLabel: 'Close',
			swapButtonOrder: false,
			justifyButtons: null,
			buttons: [],
			events: {},

			// user options
			...modbox.#checkUserOptions(userOptions)
		};

		if (typeof this.#options.body !== 'string' || !this.#options.body.length) {
			throw new Error('The "body" configuration option is required (string).');
		}

		// generate modal HTML and add to DOM
		this.#buildModal();

		// create bootstrap modal from generated HTML
		this.#modal = new bootstrap.Modal(
			this.#modalEl,
			(({ backdrop, keyboard, focus }) => ({ backdrop, keyboard, focus }))(this.#options)
		);

		// attach events to modal
		this.#addEvents();

		if (this.#options.show === true) {
			this.show();
		}
	}


	get options() {
		return this.#options;
	}


	// returns the native bootstrap modal object
	get modal() {
		return this.#modal;
	}


	// returns the top-level modal DOM element
	get modalEl() {
		return this.#modalEl;
	}


	get buttons() {
		return [...this.#footer.querySelectorAll('button')];
	}


	addButton(userBtnOptions = {}, appendStart = this.#options.swapButtonOrder) {
		// show footer if hidden
		this.#footer.classList.remove('d-none');

		const appendLocation = appendStart ? 'afterbegin' : 'beforeend';

		if (typeof userBtnOptions === 'string' && userBtnOptions.length) {
			this.#footer.insertAdjacentHTML(appendLocation, userBtnOptions);
			const buttons = this.buttons;
			return buttons[appendStart ? 0 : buttons.length - 1];
		}

		const btnOptions = { ...this.#getDefaultButtonOptions(), ...userBtnOptions };

		this.#footer.insertAdjacentHTML(appendLocation, `
			<button
				type="button"
				class="btn btn-${btnOptions.outline ? 'outline-' : ''}${btnOptions.style} ${btnOptions.class} ${btnOptions.size ? `btn-${btnOptions.size}` : ''}"
				id="${btnOptions.id}"
				${btnOptions.title ? `title="${btnOptions.title}"` : ''}
				${btnOptions.close ? 'data-bs-dismiss="modal"' : ''}
				${btnOptions.disabled ? 'disabled' : ''}
			>
				${btnOptions.icon ? `<i class="${btnOptions.icon} me-2"></i>` : ''}${btnOptions.label}
			</button>
		`.trim());

		const btn = this.#footer.querySelector(`#${btnOptions.id}`);

		if (btn && typeof btnOptions.callback === 'function') {
			btn.addEventListener('click', (ev) => btnOptions.callback.call(btn, ev, this));
		}

		return btn;
	}


	addEvent(type, callback) {
		if (['show', 'shown', 'hide', 'hidden', 'hidePrevented'].includes(type) && typeof callback === 'function') {
			this.#modalEl.addEventListener(`${type}.bs.modal`, callback);
		}
	}


	destroy() {
		this.dispose();
		this.#modalEl.remove();
	}


	// returns the container element that holds all modboxes, and creates it if it doesn't exist
	static get container() {
		let containerEl = document.querySelector('#modbox-container');

		if (!containerEl) {
			const el = document.createElement('div');
			el.id = 'modbox-container';
			containerEl = document.body.appendChild(el);
		}

		return containerEl;
	}


	// convenience method for a generic alert modbox
	static alert(userOptions = {}) {
		const defaultOptions = {
			title: 'Alert',
			closeButton: {},
		};

		const options = {
			...modbox.#deepMerge(defaultOptions, modbox.#checkUserOptions(userOptions)),
			// defaults that cannot be overridden
			destroyOnClose: true,
			defaultButton: false,
			buttons: []
		};

		return modbox.#buildPromiseModal(options);
	}


	// convenience method for an info style alert modbox
	static info(userOptions = {}) {
		return modbox.alert({
			style: 'info',
			title: 'Information',
			...modbox.#checkUserOptions(userOptions)
		});
	}


	// convenience method for a success style alert modbox
	static success(userOptions = {}) {
		return modbox.alert({
			style: 'success',
			title: 'Success',
			...modbox.#checkUserOptions(userOptions)
		});
	}


	// convenience method for an danger style alert modbox
	static danger(userOptions = {}) {
		return modbox.alert({
			style: 'danger',
			title: 'Error',
			...modbox.#checkUserOptions(userOptions)
		});
	}


	// alternate method name for the danger() modal
	static error(userOptions = {}) {
		return modbox.danger(userOptions);
	}


	// convenience method for a confirmation modbox
	static confirm(userOptions = {}) {
		const defaultOptions = {
			title: 'Confirm',
			okButton: {
				label: 'OK',
				style: 'primary'
			},
			closeButton: {
				label: 'Cancel'
			}
		};

		const options = {
			...modbox.#deepMerge(defaultOptions, modbox.#checkUserOptions(userOptions)),
			// defaults that cannot be overridden
			destroyOnClose: true,
			defaultButton: false,
			buttons: []
		};

		return modbox.#buildPromiseModal(options, 'confirm');
	}


	// convenience method for a prompt modbox
	static prompt(userOptions = {}) {
		const defaultOptions = {
			title: 'Prompt',
			input: {
				id: modbox.#getUID('modbox-input-'),
				type: 'text',
				class: '',
				value: '',
				title: null,
				placeholder: null,
				autocomplete: 'off',
				minlength: null,
				maxlength: null,
				pattern: null,
				required: false,
				_validate: false
			},
			okButton: {
				label: 'OK',
				style: 'primary'
			},
			closeButton: {
				label: 'Cancel'
			}
		};

		const options = {
			...modbox.#deepMerge(defaultOptions, modbox.#checkUserOptions(userOptions)),
			// defaults that cannot be overridden
			destroyOnClose: true,
			defaultButton: false,
			buttons: []
		};

		// if regex passed as pattern, convert to string first
		if (modbox.#typeof(options.input?.pattern) === 'regexp') {
			options.input.pattern = options.input.pattern.source;
		}

		// don't add modal close markup to button if an option is specified that needs to be validated (handled in button callback instead)
		if (options.input.required === true || typeof options.input.minlength === 'number' || (typeof options.input.pattern === 'string' && options.input.pattern.length)) {
			options.okButton.close = false;
			options.input._validate = true;
		}

		options.body = `
			${options.body ? `<p>${options.body}</p>` : ''}
			${typeof options.input === 'string' ? options.input :
				`<input
					type="${options.input.type}"
					class="form-control ${options.input.class}"
					id="${options.input.id}"
					value="${options.input.value}"
					${options.input.title ? `title="${options.input.title}"` : ''}
					${options.input.placeholder ? `placeholder="${options.input.placeholder}"` : ''}
					${options.input.autocomplete ? `autocomplete="${options.input.autocomplete}"` : ''}
					${typeof options.input.minlength === 'number' ? `minlength="${options.input.minlength}"` : ''}
					${typeof options.input.maxlength === 'number' ? `maxlength="${options.input.maxlength}"` : ''}
					${typeof options.input.pattern === 'string' && options.input.pattern.length ? `pattern="${options.input.pattern}"` : ''}
					${options.input.required ? 'required' : ''}
				>`
			}
		`.trim();

		return modbox.#buildPromiseModal(options, 'prompt');
	}


	/* expose native bootstrap modal methods */

	toggle() {
		this.#modal.toggle();
	}

	show(relatedTarget) {
		this.#modal.show(relatedTarget);
	}

	hide() {
		this.#modal.hide();
	}

	handleUpdate() {
		this.#modal.handleUpdate();
	}

	dispose() {
		this.#modal.dispose();
	}

	static getInstance(modalEl) {
		return bootstrap.Modal.getInstance(modalEl);
	}

	static getOrCreateInstance(modalEl) {
		return bootstrap.Modal.getOrCreateInstance(modalEl);
	}

}
