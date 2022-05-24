class modbox {

	/* private members */

	#options;
	#modal;
	#modalEl;
	#footer;

	static #bootstrapModal;

	static #defaultOptions = {
		icon: null,
		style: 'white',
		titleStyle: null,
		title: 'Information',
		body: '',
		message: '',
		size: null,
		center: false,
		fade: true,
		show: false,
		relatedTarget: undefined,
		scrollable: true,
		destroyOnClose: false,
		defaultButton: true,
		swapButtonOrder: false,
		justifyButtons: null,
		showHeaderClose: true,
		events: {},

		// only applies to instance/constructor modals
		buttons: [],

		// only applies to static modals, and overwrites defaults set by modbox.defaultButtonOptions
		okButton: {
			label: 'OK',
			style: 'primary'
		},
		closeButton: {
			label: 'Close',
			style: 'secondary'
		},

		// only applies to .prompt() static modal
		input: {
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
			sanitizer: false
		},

		// meant to be overridden with user defined function
		sanitizer: modbox.#sanitizeString
	};


	static #defaultButtonOptions = {
		label: 'Close',
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


	// default options for each static modal type
	static #modalDefaults = {
		alert: {
			title: 'Alert'
		},
		info: {
			style: 'info',
			title: 'Information'
		},
		success: {
			style: 'success',
			title: 'Success'
		},
		warning: {
			style: 'warning',
			title: 'Warning'
		},
		danger: {
			style: 'danger',
			title: 'Error'
		},
		confirm: {
			title: 'Confirm'
		},
		prompt: {
			title: 'Prompt',
			input: {
				id: modbox.#getUID('modbox-input-')
			}
		}
	};


	// generate a unique id
	static #getUID(prefix = 'modbox-') {
		return prefix + Date.now() + Math.floor(Math.random() * 10000);
	}


	// more specific type checking than standard typeof
	static #typeof(obj) {
		return (typeof obj === 'object') ? Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() : typeof obj;
	}


	// recursive object merge
	static #deepMerge(target, source) {
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
	static #checkUserOptions(userOptions) {
		return (typeof userOptions === 'string') ? { body: userOptions } : userOptions;
	}


	// this has to be done on the fly as opposed to when initializing #modalDefaults above, otherwise changes to modbox.defaultOptions will not be reflected in the static modals
	static #mergeModalOptions(modalType, userOptions = {}) {
		return modbox.#deepMerge(
			modbox.#deepMerge(modbox.#defaultOptions, modbox.#modalDefaults[modalType]),
			modbox.#checkUserOptions(userOptions)
		);
	}


	// default sanitizer function which just returns the string unmodified
	static #sanitizeString(str = '') {
		return str;
	}


	// build custom modal that returns a Promise
	static #buildPromiseModal(options = {}, type = 'alert') {
		options = {
			...options,
			// defaults that cannot be overridden
			destroyOnClose: true,
			defaultButton: false,
			buttons: []
		};

		return new Promise((resolve, reject) => {
			const box = new modbox(options);

			// build button configurations
			const btns = [options.closeButton];

			if (['confirm', 'prompt'].includes(type)) {
				let okCallback = () => resolve();

				if (type === 'prompt' && modbox.#typeof(options.input) === 'object') {
					let validateInput = false;

					// don't add modal close markup to button if an option is specified that needs to be validated (handled in button callback instead)
					if (options.input.required === true || typeof options.input.minlength === 'number' || (typeof options.input.pattern === 'string' && options.input.pattern.length)) {
						options.okButton.close = false;
						validateInput = true;
					}

					okCallback = () => {
						const inputEl = box.modalEl.querySelector(`#${options.input.id}`);
						const isValid = (validateInput === true) ? inputEl.reportValidity() : true;

						if (isValid) {
							const sanitizer = (typeof box.options.input.sanitizer === 'function') ? box.options.input.sanitizer :
								(box.options.input.sanitizer === true) ? box.options.sanitizer : modbox.#sanitizeString;

							resolve(sanitizer(inputEl.value));
							box.hide();
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

			// add buttons to modal
			const [okBtn, closeBtn] = btns.map(btnOptions => box.addButton(btnOptions));

			// trigger okButton if enter key pressed within input
			if (type === 'prompt' && modbox.#typeof(options.input) === 'object') {
				box.modalEl.querySelector(`#${options.input.id}`).addEventListener('keyup', (ev) => {
					if (ev.key === 'Enter') {
						okBtn.click();
					}
				});
			}

			// settle the Promise if the modal is closed in a way other than clicking the buttons (click X, click backdrop, press ESC, etc)
			box.addEvent('hidden', () => {
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


	#buildModal() {
		const isDarkStyle = ['primary', 'secondary', 'success', 'danger', 'dark', 'body'].includes(this.#options.style);
		const titleStyle = this.#options.titleStyle || (isDarkStyle ? 'white' : 'dark');
		const closeButtonStyle = `btn-close ${isDarkStyle ? 'btn-close-white' : ''}`;

		modbox.container.insertAdjacentHTML('beforeend', this.#options.sanitizer(`
			<div class="modal ${this.#options.fade ? 'fade' : ''}" id="${this.#options.id}" tabindex="-1" aria-labelledby="${this.#options.id}-title" aria-hidden="true">
				<div class="modal-dialog ${this.#options.scrollable ? 'modal-dialog-scrollable' : ''} ${this.#options.center ? 'modal-dialog-centered' : ''} ${this.#options.size ? `modal-${this.#options.size}` : ''}">
					<div class="modal-content">
						<div class="modal-header ${this.#options.style ? `bg-${this.#options.style}` : ''} ${!this.#options.title ? 'd-none' : ''}">
							<h5 class="modal-title text-${titleStyle}">
								${this.#options.icon ? `<i class="${this.#options.icon} me-3"></i>` : ''}
								<span id="${this.#options.id}-title">${this.#options.title}</span>
							</h5>
							<button type="button" class="${closeButtonStyle} ${this.#options.showHeaderClose === false ? 'd-none' : ''}" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body">
							${this.#options.body}
						</div>
						<div class="modal-footer ${this.#options.justifyButtons ? `d-flex justify-content-${this.#options.justifyButtons}` : ''}"></div>
					</div>
				</div>
			</div>
		`.trim()));

		this.#modalEl = modbox.container.querySelector(`#${this.#options.id}`);
		this.#footer = this.#modalEl.querySelector('.modal-footer');

		// add buttons to modal
		this.#addButtons();
	}


	#addButtons() {
		if (!Array.isArray(this.#options.buttons)) {
			this.#options.buttons = [];
		}

		if (this.#options.buttons.length === 0 && this.#options.defaultButton === true) {
			// add default button
			this.#options.buttons = [modbox.#defaultButtonOptions];
		}
		else {
			// hide footer when there are no buttons
			this.#footer.classList.add('d-none');
		}

		this.#options.buttons.forEach(userBtnOptions => this.addButton(userBtnOptions));
	}


	#addEvents() {
		Object.entries(this.#options.events).forEach(([type, fn]) => {
			this.addEvent(type, fn);
		});

		if (this.#options.destroyOnClose === true) {
			this.addEvent('hidden', () => this.destroy());
		}
	}


	/* public members */

	constructor(userOptions = {}) {
		// make sure there is a reference to bootstrap
		if (!modbox.#bootstrapModal) {
			// if bootstrapModal property has not been set, try to use global bootstrap object if it exists
			if (typeof bootstrap === 'object') {
				modbox.#bootstrapModal = bootstrap.Modal;
			}
			else {
				throw new Error('The "modbox.bootstrapModal" property is undefined.  If importing Bootstrap as an ES module, you must also manually set this property.  See the modbox README/docs for more info.');
			}
		}

		// add bootstrap modal defaults to modbox default options
		// this is done here as opposed to on #defaultOptions initialization to avoid hoisting issues when bootstrap is loaded as an ES module
		modbox.#defaultOptions = {
			...modbox.#bootstrapModal.Default,
			...modbox.#defaultOptions
		};

		this.#options = {
			// modbox default options
			...modbox.#defaultOptions,
			id: modbox.#getUID(),
			// user options
			...modbox.#checkUserOptions(userOptions)
		};

		// check for required options
		if (typeof this.#options.body !== 'string' || !this.#options.body.length) {
			if (typeof this.#options.message === 'string' && this.#options.message.length) {
				this.#options.body = this.#options.message;
			}
			else {
				throw new Error('The "body" or "message" configuration option is required (string).');
			}
		}

		// generate modal HTML and add to DOM
		this.#buildModal();

		// create bootstrap modal from generated HTML
		this.#modal = new modbox.#bootstrapModal(
			this.#modalEl,
			(({ backdrop, keyboard, focus }) => ({ backdrop, keyboard, focus }))(this.#options)
		);

		// attach events to modal
		this.#addEvents();

		if (this.#options.show === true) {
			this.show(this.#options.relatedTarget);
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


	static get bootstrapModal() {
		return modbox.#bootstrapModal;
	}


	static set bootstrapModal(bootstrapModalRef) {
		modbox.#bootstrapModal = bootstrapModalRef;
	}


	static get defaultOptions() {
		return modbox.#defaultOptions;
	}


	static set defaultOptions(userDefaultOptions = {}) {
		modbox.#defaultOptions = modbox.#deepMerge(modbox.#defaultOptions, userDefaultOptions);
	}


	static get defaultButtonOptions() {
		return modbox.#defaultButtonOptions;
	}


	static set defaultButtonOptions(userDefaultButtonOptions = {}) {
		modbox.#defaultButtonOptions = { ...modbox.#defaultButtonOptions, ...userDefaultButtonOptions };
	}


	// set default options for each static modal type
	static setDefaults(modalType, modalOptions = {}) {
		modalType = modalType.trim?.().toLowerCase?.();

		if (modalType === 'error') {
			modalType = 'danger';
		}

		if (!modalType || !['alert', 'info', 'success', 'warning', 'danger', 'confirm', 'prompt'].includes(modalType)) {
			throw new Error('Invalid modal type.');
		}

		modalOptions = modbox.#typeof(modalOptions) === 'object' ? modalOptions : {};
		modbox.#modalDefaults[modalType] = modbox.#deepMerge(modbox.#modalDefaults[modalType], modalOptions);
	}


	addButton(userBtnOptions = {}, swapOrder = this.#options.swapButtonOrder) {
		// show footer if hidden
		this.#footer.classList.remove('d-none');

		const appendLocation = swapOrder ? 'afterbegin' : 'beforeend';

		if (typeof userBtnOptions === 'string' && userBtnOptions.length) {
			this.#footer.insertAdjacentHTML(appendLocation, this.#options.sanitizer(userBtnOptions));
			const buttons = this.buttons;
			return buttons[swapOrder ? 0 : buttons.length - 1];
		}

		const btnOptions = {
			...modbox.#defaultButtonOptions,
			id: modbox.#getUID('modbox-btn-'),
			...userBtnOptions
		};

		this.#footer.insertAdjacentHTML(appendLocation, this.#options.sanitizer(`
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
		`.trim()));

		const btn = this.#footer.querySelector(`#${btnOptions.id}`);

		if (btn && typeof btnOptions.callback === 'function') {
			btn.addEventListener('click', (ev) => btnOptions.callback.call(btn, ev, this));
		}

		return btn;
	}


	addEvent(type, callback) {
		if (['show', 'shown', 'hide', 'hidden', 'hidePrevented'].includes(type) && typeof callback === 'function') {
			this.#modalEl.addEventListener(`${type}.bs.modal`, (ev) => callback.call(this.#modalEl, ev, this));
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
		return modbox.#buildPromiseModal(
			modbox.#mergeModalOptions('alert', userOptions)
		);
	}


	// convenience method for an info style alert modbox
	static info(userOptions = {}) {
		return modbox.#buildPromiseModal(
			modbox.#mergeModalOptions('info', userOptions)
		);
	}


	// convenience method for a success style alert modbox
	static success(userOptions = {}) {
		return modbox.#buildPromiseModal(
			modbox.#mergeModalOptions('success', userOptions)
		);
	}


	// convenience method for a warning style alert modbox
	static warning(userOptions = {}) {
		return modbox.#buildPromiseModal(
			modbox.#mergeModalOptions('warning', userOptions)
		);
	}


	// convenience method for an danger style alert modbox
	static danger(userOptions = {}) {
		return modbox.#buildPromiseModal(
			modbox.#mergeModalOptions('danger', userOptions)
		);
	}


	// alternate method name for the danger() modal
	static error(userOptions = {}) {
		return modbox.danger(userOptions);
	}


	// convenience method for a confirmation modbox
	static confirm(userOptions = {}) {
		return modbox.#buildPromiseModal(
			modbox.#mergeModalOptions('confirm', userOptions),
			'confirm'
		);
	}


	// convenience method for a prompt modbox
	static prompt(userOptions = {}) {
		const options = modbox.#mergeModalOptions('prompt', userOptions);

		// if regex passed as pattern, convert to string first
		if (modbox.#typeof(options.input?.pattern) === 'regexp') {
			options.input.pattern = options.input.pattern.source;
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

	show(relatedTarget = this.#options.relatedTarget) {
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
		return modbox.#bootstrapModal.getInstance(modalEl);
	}

	static getOrCreateInstance(modalEl) {
		return modbox.#bootstrapModal.getOrCreateInstance(modalEl);
	}

}
