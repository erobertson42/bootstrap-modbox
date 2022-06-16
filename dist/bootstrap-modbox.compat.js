"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classStaticPrivateFieldSpecSet(receiver, classConstructor, descriptor, value) { _classCheckPrivateStaticAccess(receiver, classConstructor); _classCheckPrivateStaticFieldDescriptor(descriptor, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) { _classCheckPrivateStaticAccess(receiver, classConstructor); _classCheckPrivateStaticFieldDescriptor(descriptor, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classCheckPrivateStaticFieldDescriptor(descriptor, action) { if (descriptor === undefined) { throw new TypeError("attempted to " + action + " private static field before its declaration"); } }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classStaticPrivateMethodGet(receiver, classConstructor, method) { _classCheckPrivateStaticAccess(receiver, classConstructor); return method; }

function _classCheckPrivateStaticAccess(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } }

var _options = /*#__PURE__*/new WeakMap();

var _modal = /*#__PURE__*/new WeakMap();

var _modalEl = /*#__PURE__*/new WeakMap();

var _footer = /*#__PURE__*/new WeakMap();

var _buildModal = /*#__PURE__*/new WeakSet();

var _addButtons = /*#__PURE__*/new WeakSet();

var _addEvents = /*#__PURE__*/new WeakSet();

/*
 * bootstrap-modbox
 * Native JavaScript wrapper for simple Bootstrap 5 modals. Provides support for alert, confirm, and prompt modals, as well as advanced custom dialogs.
 *
 * version: 1.6.2
 * author: Eric Robertson
 * license: MIT
 *
 * https://erobertson42.github.io/bootstrap-modbox/
 */
var modbox = /*#__PURE__*/function () {
  /* private members */
  // default options for each static modal type
  // generate a unique id
  // more specific type checking than standard typeof
  // recursive object merge
  // if string passed in as options argument, convert to an object and use as the body value
  // this has to be done on the fly as opposed to when initializing #modalDefaults above, otherwise changes to modbox.defaultOptions will not be reflected in the static modals
  // default sanitizer function which just returns the string unmodified
  // build custom modal that returns a Promise

  /* public members */
  function modbox() {
    var userOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, modbox);

    _classPrivateMethodInitSpec(this, _addEvents);

    _classPrivateMethodInitSpec(this, _addButtons);

    _classPrivateMethodInitSpec(this, _buildModal);

    _classPrivateFieldInitSpec(this, _options, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _modal, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _modalEl, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _footer, {
      writable: true,
      value: void 0
    });

    // make sure there is a reference to bootstrap
    if (!_classStaticPrivateFieldSpecGet(modbox, modbox, _bootstrapModal)) {
      // if bootstrapModal property has not been set, try to use global bootstrap object if it exists
      if (typeof bootstrap === 'object') {
        _classStaticPrivateFieldSpecSet(modbox, modbox, _bootstrapModal, bootstrap.Modal);
      } else {
        throw new Error('The "modbox.bootstrapModal" property is undefined.  If importing Bootstrap as an ES module, you must also manually set this property.  See the modbox README/docs for more info.');
      }
    } // add bootstrap modal defaults to modbox default options
    // this is done here as opposed to on #defaultOptions initialization to avoid hoisting issues when bootstrap is loaded as an ES module


    _classStaticPrivateFieldSpecSet(modbox, modbox, _defaultOptions, _objectSpread(_objectSpread({}, _classStaticPrivateFieldSpecGet(modbox, modbox, _bootstrapModal).Default), _classStaticPrivateFieldSpecGet(modbox, modbox, _defaultOptions)));

    _classPrivateFieldSet(this, _options, _objectSpread(_objectSpread({}, _classStaticPrivateFieldSpecGet(modbox, modbox, _defaultOptions)), {}, {
      id: _classStaticPrivateMethodGet(modbox, modbox, _getUID).call(modbox)
    }, _classStaticPrivateMethodGet(modbox, modbox, _checkUserOptions).call(modbox, userOptions))); // check for required options


    if (typeof _classPrivateFieldGet(this, _options).body !== 'string' || !_classPrivateFieldGet(this, _options).body.length) {
      if (typeof _classPrivateFieldGet(this, _options).message === 'string' && _classPrivateFieldGet(this, _options).message.length) {
        _classPrivateFieldGet(this, _options).body = _classPrivateFieldGet(this, _options).message;
      } else {
        throw new Error('The "body" or "message" configuration option is required (string).');
      }
    } // generate modal HTML and add to DOM


    _classPrivateMethodGet(this, _buildModal, _buildModal2).call(this); // create bootstrap modal from generated HTML


    _classPrivateFieldSet(this, _modal, new (_classStaticPrivateFieldSpecGet(modbox, modbox, _bootstrapModal))(_classPrivateFieldGet(this, _modalEl), function (_ref) {
      var backdrop = _ref.backdrop,
          keyboard = _ref.keyboard,
          focus = _ref.focus;
      return {
        backdrop,
        keyboard,
        focus
      };
    }(_classPrivateFieldGet(this, _options)))); // attach events to modal


    _classPrivateMethodGet(this, _addEvents, _addEvents2).call(this);

    if (_classPrivateFieldGet(this, _options).show === true) {
      this.show(_classPrivateFieldGet(this, _options).relatedTarget);
    }
  }

  _createClass(modbox, [{
    key: "options",
    get: function get() {
      return _classPrivateFieldGet(this, _options);
    } // returns the native bootstrap modal object

  }, {
    key: "modal",
    get: function get() {
      return _classPrivateFieldGet(this, _modal);
    } // returns the top-level modal DOM element

  }, {
    key: "modalEl",
    get: function get() {
      return _classPrivateFieldGet(this, _modalEl);
    }
  }, {
    key: "buttons",
    get: function get() {
      return _toConsumableArray(_classPrivateFieldGet(this, _footer).querySelectorAll('button'));
    }
  }, {
    key: "addButton",
    value: function addButton() {
      var _this = this;

      var userBtnOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var swapOrder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _classPrivateFieldGet(this, _options).swapButtonOrder;

      // show footer if hidden
      _classPrivateFieldGet(this, _footer).classList.remove('d-none');

      var appendLocation = swapOrder ? 'afterbegin' : 'beforeend';

      if (typeof userBtnOptions === 'string' && userBtnOptions.length) {
        _classPrivateFieldGet(this, _footer).insertAdjacentHTML(appendLocation, _classPrivateFieldGet(this, _options).sanitizer(userBtnOptions));

        var buttons = this.buttons;
        return buttons[swapOrder ? 0 : buttons.length - 1];
      }

      var btnOptions = _objectSpread(_objectSpread({}, _classStaticPrivateFieldSpecGet(modbox, modbox, _defaultButtonOptions)), {}, {
        id: _classStaticPrivateMethodGet(modbox, modbox, _getUID).call(modbox, 'modbox-btn-')
      }, userBtnOptions);

      _classPrivateFieldGet(this, _footer).insertAdjacentHTML(appendLocation, _classPrivateFieldGet(this, _options).sanitizer("\n\t\t\t<button\n\t\t\t\ttype=\"button\"\n\t\t\t\tclass=\"btn btn-".concat(btnOptions.outline ? 'outline-' : '').concat(btnOptions.style, " ").concat(btnOptions.class, " ").concat(btnOptions.size ? "btn-".concat(btnOptions.size) : '', "\"\n\t\t\t\tid=\"").concat(btnOptions.id, "\"\n\t\t\t\t").concat(btnOptions.title ? "title=\"".concat(btnOptions.title, "\"") : '', "\n\t\t\t\t").concat(btnOptions.close ? 'data-bs-dismiss="modal"' : '', "\n\t\t\t\t").concat(btnOptions.disabled ? 'disabled' : '', "\n\t\t\t>\n\t\t\t\t").concat(btnOptions.icon ? "<i class=\"".concat(btnOptions.icon, " me-2\"></i>") : '').concat(btnOptions.label, "\n\t\t\t</button>\n\t\t").trim()));

      var btn = _classPrivateFieldGet(this, _footer).querySelector("#".concat(btnOptions.id));

      if (btn && typeof btnOptions.callback === 'function') {
        btn.addEventListener('click', function (ev) {
          return btnOptions.callback.call(btn, ev, _this);
        });
      }

      return btn;
    }
  }, {
    key: "addEvent",
    value: function addEvent(type, callback) {
      var _this2 = this;

      if (['show', 'shown', 'hide', 'hidden', 'hidePrevented'].includes(type) && typeof callback === 'function') {
        _classPrivateFieldGet(this, _modalEl).addEventListener("".concat(type, ".bs.modal"), function (ev) {
          return callback.call(_classPrivateFieldGet(_this2, _modalEl), ev, _this2);
        });
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.dispose();

      _classPrivateFieldGet(this, _modalEl).remove();
    } // returns the container element that holds all modboxes, and creates it if it doesn't exist

  }, {
    key: "toggle",
    value:
    /* expose native bootstrap modal methods */
    function toggle() {
      _classPrivateFieldGet(this, _modal).toggle();
    }
  }, {
    key: "show",
    value: function show() {
      var relatedTarget = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _classPrivateFieldGet(this, _options).relatedTarget;

      _classPrivateFieldGet(this, _modal).show(relatedTarget);
    }
  }, {
    key: "hide",
    value: function hide() {
      _classPrivateFieldGet(this, _modal).hide();
    }
  }, {
    key: "handleUpdate",
    value: function handleUpdate() {
      _classPrivateFieldGet(this, _modal).handleUpdate();
    }
  }, {
    key: "dispose",
    value: function dispose() {
      _classPrivateFieldGet(this, _modal).dispose();
    }
  }], [{
    key: "bootstrapModal",
    get: function get() {
      return _classStaticPrivateFieldSpecGet(modbox, modbox, _bootstrapModal);
    },
    set: function set(bootstrapModalRef) {
      _classStaticPrivateFieldSpecSet(modbox, modbox, _bootstrapModal, bootstrapModalRef);
    }
  }, {
    key: "defaultOptions",
    get: function get() {
      return _classStaticPrivateFieldSpecGet(modbox, modbox, _defaultOptions);
    },
    set: function set(userDefaultOptions) {
      if (userDefaultOptions === void 0) {
        userDefaultOptions = {};
      }

      _classStaticPrivateFieldSpecSet(modbox, modbox, _defaultOptions, _classStaticPrivateMethodGet(modbox, modbox, _deepMerge).call(modbox, _classStaticPrivateFieldSpecGet(modbox, modbox, _defaultOptions), userDefaultOptions));
    }
  }, {
    key: "defaultButtonOptions",
    get: function get() {
      return _classStaticPrivateFieldSpecGet(modbox, modbox, _defaultButtonOptions);
    },
    set: function set(userDefaultButtonOptions) {
      if (userDefaultButtonOptions === void 0) {
        userDefaultButtonOptions = {};
      }

      _classStaticPrivateFieldSpecSet(modbox, modbox, _defaultButtonOptions, _objectSpread(_objectSpread({}, _classStaticPrivateFieldSpecGet(modbox, modbox, _defaultButtonOptions)), userDefaultButtonOptions));
    } // set default options for each static modal type

  }, {
    key: "setDefaults",
    value: function setDefaults(modalType) {
      var _modalType$trim, _modalType, _modalType$trim$call$, _modalType$trim$call;

      var modalOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      modalType = (_modalType$trim = (_modalType = modalType).trim) === null || _modalType$trim === void 0 ? void 0 : (_modalType$trim$call$ = (_modalType$trim$call = _modalType$trim.call(_modalType)).toLowerCase) === null || _modalType$trim$call$ === void 0 ? void 0 : _modalType$trim$call$.call(_modalType$trim$call);

      if (modalType === 'error') {
        modalType = 'danger';
      }

      if (!modalType || !['alert', 'info', 'success', 'warning', 'danger', 'confirm', 'prompt'].includes(modalType)) {
        throw new Error('Invalid modal type.');
      }

      modalOptions = _classStaticPrivateMethodGet(modbox, modbox, _typeof).call(modbox, modalOptions) === 'object' ? modalOptions : {};
      _classStaticPrivateFieldSpecGet(modbox, modbox, _modalDefaults)[modalType] = _classStaticPrivateMethodGet(modbox, modbox, _deepMerge).call(modbox, _classStaticPrivateFieldSpecGet(modbox, modbox, _modalDefaults)[modalType], modalOptions);
    }
  }, {
    key: "container",
    get: function get() {
      var containerEl = document.querySelector('#modbox-container');

      if (!containerEl) {
        var el = document.createElement('div');
        el.id = 'modbox-container';
        containerEl = document.body.appendChild(el);
      }

      return containerEl;
    } // convenience method for a generic alert modbox

  }, {
    key: "alert",
    value: function alert() {
      var userOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return _classStaticPrivateMethodGet(modbox, modbox, _buildPromiseModal).call(modbox, _classStaticPrivateMethodGet(modbox, modbox, _mergeModalOptions).call(modbox, 'alert', userOptions));
    } // convenience method for an info style alert modbox

  }, {
    key: "info",
    value: function info() {
      var userOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return _classStaticPrivateMethodGet(modbox, modbox, _buildPromiseModal).call(modbox, _classStaticPrivateMethodGet(modbox, modbox, _mergeModalOptions).call(modbox, 'info', userOptions));
    } // convenience method for a success style alert modbox

  }, {
    key: "success",
    value: function success() {
      var userOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return _classStaticPrivateMethodGet(modbox, modbox, _buildPromiseModal).call(modbox, _classStaticPrivateMethodGet(modbox, modbox, _mergeModalOptions).call(modbox, 'success', userOptions));
    } // convenience method for a warning style alert modbox

  }, {
    key: "warning",
    value: function warning() {
      var userOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return _classStaticPrivateMethodGet(modbox, modbox, _buildPromiseModal).call(modbox, _classStaticPrivateMethodGet(modbox, modbox, _mergeModalOptions).call(modbox, 'warning', userOptions));
    } // convenience method for an danger style alert modbox

  }, {
    key: "danger",
    value: function danger() {
      var userOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return _classStaticPrivateMethodGet(modbox, modbox, _buildPromiseModal).call(modbox, _classStaticPrivateMethodGet(modbox, modbox, _mergeModalOptions).call(modbox, 'danger', userOptions));
    } // alternate method name for the danger() modal

  }, {
    key: "error",
    value: function error() {
      var userOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return modbox.danger(userOptions);
    } // convenience method for a confirmation modbox

  }, {
    key: "confirm",
    value: function confirm() {
      var userOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return _classStaticPrivateMethodGet(modbox, modbox, _buildPromiseModal).call(modbox, _classStaticPrivateMethodGet(modbox, modbox, _mergeModalOptions).call(modbox, 'confirm', userOptions), 'confirm');
    } // convenience method for a prompt modbox

  }, {
    key: "prompt",
    value: function prompt() {
      var _options$input;

      var userOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var options = _classStaticPrivateMethodGet(modbox, modbox, _mergeModalOptions).call(modbox, 'prompt', userOptions); // if regex passed as pattern, convert to string first


      if (_classStaticPrivateMethodGet(modbox, modbox, _typeof).call(modbox, (_options$input = options.input) === null || _options$input === void 0 ? void 0 : _options$input.pattern) === 'regexp') {
        options.input.pattern = options.input.pattern.source;
      }

      options.body = "\n\t\t\t".concat(options.body ? "<p>".concat(options.body, "</p>") : '', "\n\t\t\t").concat(typeof options.input === 'string' ? options.input : "<input\n\t\t\t\t\ttype=\"".concat(options.input.type, "\"\n\t\t\t\t\tclass=\"form-control ").concat(options.input.class, "\"\n\t\t\t\t\tid=\"").concat(options.input.id, "\"\n\t\t\t\t\tvalue=\"").concat(options.input.value, "\"\n\t\t\t\t\t").concat(options.input.title ? "title=\"".concat(options.input.title, "\"") : '', "\n\t\t\t\t\t").concat(options.input.placeholder ? "placeholder=\"".concat(options.input.placeholder, "\"") : '', "\n\t\t\t\t\t").concat(options.input.autocomplete ? "autocomplete=\"".concat(options.input.autocomplete, "\"") : '', "\n\t\t\t\t\t").concat(typeof options.input.minlength === 'number' ? "minlength=\"".concat(options.input.minlength, "\"") : '', "\n\t\t\t\t\t").concat(typeof options.input.maxlength === 'number' ? "maxlength=\"".concat(options.input.maxlength, "\"") : '', "\n\t\t\t\t\t").concat(typeof options.input.pattern === 'string' && options.input.pattern.length ? "pattern=\"".concat(options.input.pattern, "\"") : '', "\n\t\t\t\t\t").concat(options.input.required ? 'required' : '', "\n\t\t\t\t>"), "\n\t\t").trim();
      return _classStaticPrivateMethodGet(modbox, modbox, _buildPromiseModal).call(modbox, options, 'prompt');
    }
  }, {
    key: "getInstance",
    value: function getInstance(modalEl) {
      return _classStaticPrivateFieldSpecGet(modbox, modbox, _bootstrapModal).getInstance(modalEl);
    }
  }, {
    key: "getOrCreateInstance",
    value: function getOrCreateInstance(modalEl) {
      return _classStaticPrivateFieldSpecGet(modbox, modbox, _bootstrapModal).getOrCreateInstance(modalEl);
    }
  }]);

  return modbox;
}();

function _getUID() {
  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'modbox-';
  return prefix + Date.now() + Math.floor(Math.random() * 10000);
}

function _typeof(obj) {
  return typeof obj === 'object' ? Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() : typeof obj;
}

function _deepMerge(target, source) {
  var result = _objectSpread(_objectSpread({}, target), source);

  Object.keys(result).forEach(function (key) {
    var tProp = target[key];
    var sProp = source[key];

    if (_classStaticPrivateMethodGet(modbox, modbox, _typeof).call(modbox, tProp) === 'object' && _classStaticPrivateMethodGet(modbox, modbox, _typeof).call(modbox, sProp) === 'object') {
      result[key] = _classStaticPrivateMethodGet(modbox, modbox, _deepMerge).call(modbox, tProp, sProp);
    }
  });
  return result;
}

function _checkUserOptions(userOptions) {
  return typeof userOptions === 'string' ? {
    body: userOptions
  } : userOptions;
}

function _mergeModalOptions(modalType) {
  var userOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _classStaticPrivateMethodGet(modbox, modbox, _deepMerge).call(modbox, _classStaticPrivateMethodGet(modbox, modbox, _deepMerge).call(modbox, _classStaticPrivateFieldSpecGet(modbox, modbox, _defaultOptions), _classStaticPrivateFieldSpecGet(modbox, modbox, _modalDefaults)[modalType]), _classStaticPrivateMethodGet(modbox, modbox, _checkUserOptions).call(modbox, userOptions));
}

function _sanitizeString() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return str;
}

function _buildPromiseModal() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'alert';
  options = _objectSpread(_objectSpread({}, options), {}, {
    // defaults that cannot be overridden
    destroyOnClose: true,
    defaultButton: false,
    buttons: []
  });
  return new Promise(function (resolve, reject) {
    var box = new modbox(options); // build button configurations

    var btns = [options.closeButton];

    if (['confirm', 'prompt'].includes(type)) {
      var okCallback = function okCallback() {
        return resolve();
      };

      if (type === 'prompt' && _classStaticPrivateMethodGet(modbox, modbox, _typeof).call(modbox, options.input) === 'object') {
        var validateInput = false; // don't add modal close markup to button if an option is specified that needs to be validated (handled in button callback instead)

        if (options.input.required === true || typeof options.input.minlength === 'number' || typeof options.input.pattern === 'string' && options.input.pattern.length) {
          options.okButton.close = false;
          validateInput = true;
        }

        okCallback = function okCallback() {
          var inputEl = box.modalEl.querySelector("#".concat(options.input.id));
          var isValid = validateInput === true ? inputEl.reportValidity() : true;

          if (isValid) {
            var sanitizer = typeof box.options.input.sanitizer === 'function' ? box.options.input.sanitizer : box.options.input.sanitizer === true ? box.options.sanitizer : _classStaticPrivateMethodGet(modbox, modbox, _sanitizeString);
            resolve(sanitizer(inputEl.value));
            box.hide();
          }
        };
      }

      btns.unshift(_objectSpread(_objectSpread({}, options.okButton), {}, {
        callback: function callback(ev, modal) {
          if (typeof options.okButton.callback === 'function') {
            options.okButton.callback.call(this, ev, modal);
          }

          var defaultPrevented = ev.defaultPrevented != null ? ev.defaultPrevented : ev.returnValue === false;

          if (defaultPrevented) {
            return;
          }

          okCallback();
        }
      }));
    } // add buttons to modal


    var _btns$map = btns.map(function (btnOptions) {
      return box.addButton(btnOptions);
    }),
        _btns$map2 = _slicedToArray(_btns$map, 2),
        okBtn = _btns$map2[0],
        closeBtn = _btns$map2[1]; // trigger okButton if enter key pressed within input


    if (type === 'prompt' && _classStaticPrivateMethodGet(modbox, modbox, _typeof).call(modbox, options.input) === 'object') {
      box.modalEl.querySelector("#".concat(options.input.id)).addEventListener('keyup', function (ev) {
        if (ev.key === 'Enter') {
          okBtn.click();
        }
      });
    } // settle the Promise if the modal is closed in a way other than clicking the buttons (click X, click backdrop, press ESC, etc)


    box.addEvent('hidden', function () {
      if (type === 'alert') {
        resolve();
      } else if (['confirm', 'prompt'].includes(type) && document.activeElement !== okBtn) {
        reject();
      }
    });
    box.show();
  });
}

function _buildModal2() {
  var isDarkStyle = ['primary', 'secondary', 'success', 'danger', 'dark', 'body'].includes(_classPrivateFieldGet(this, _options).style);
  var titleStyle = _classPrivateFieldGet(this, _options).titleStyle || (isDarkStyle ? 'white' : 'dark');
  var closeButtonStyle = "btn-close ".concat(isDarkStyle ? 'btn-close-white' : '');
  modbox.container.insertAdjacentHTML('beforeend', _classPrivateFieldGet(this, _options).sanitizer("\n\t\t\t<div class=\"modal ".concat(_classPrivateFieldGet(this, _options).fade ? 'fade' : '', "\" id=\"").concat(_classPrivateFieldGet(this, _options).id, "\" tabindex=\"-1\" aria-labelledby=\"").concat(_classPrivateFieldGet(this, _options).id, "-title\" aria-hidden=\"true\">\n\t\t\t\t<div class=\"modal-dialog ").concat(_classPrivateFieldGet(this, _options).scrollable ? 'modal-dialog-scrollable' : '', " ").concat(_classPrivateFieldGet(this, _options).center ? 'modal-dialog-centered' : '', " ").concat(_classPrivateFieldGet(this, _options).size ? "modal-".concat(_classPrivateFieldGet(this, _options).size) : '', "\">\n\t\t\t\t\t<div class=\"modal-content\">\n\t\t\t\t\t\t<div class=\"modal-header ").concat(_classPrivateFieldGet(this, _options).style ? "bg-".concat(_classPrivateFieldGet(this, _options).style) : '', " ").concat(!_classPrivateFieldGet(this, _options).title ? 'd-none' : '', "\">\n\t\t\t\t\t\t\t<h5 class=\"modal-title text-").concat(titleStyle, "\">\n\t\t\t\t\t\t\t\t").concat(_classPrivateFieldGet(this, _options).icon ? "<i class=\"".concat(_classPrivateFieldGet(this, _options).icon, " me-3\"></i>") : '', "\n\t\t\t\t\t\t\t\t<span id=\"").concat(_classPrivateFieldGet(this, _options).id, "-title\">").concat(_classPrivateFieldGet(this, _options).title, "</span>\n\t\t\t\t\t\t\t</h5>\n\t\t\t\t\t\t\t<button type=\"button\" class=\"").concat(closeButtonStyle, " ").concat(_classPrivateFieldGet(this, _options).showHeaderClose === false ? 'd-none' : '', "\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"modal-body\">\n\t\t\t\t\t\t\t").concat(_classPrivateFieldGet(this, _options).body, "\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"modal-footer ").concat(_classPrivateFieldGet(this, _options).justifyButtons ? "d-flex justify-content-".concat(_classPrivateFieldGet(this, _options).justifyButtons) : '', "\"></div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t").trim()));

  _classPrivateFieldSet(this, _modalEl, modbox.container.querySelector("#".concat(_classPrivateFieldGet(this, _options).id)));

  _classPrivateFieldSet(this, _footer, _classPrivateFieldGet(this, _modalEl).querySelector('.modal-footer')); // add buttons to modal


  _classPrivateMethodGet(this, _addButtons, _addButtons2).call(this);
}

function _addButtons2() {
  var _this3 = this;

  if (!Array.isArray(_classPrivateFieldGet(this, _options).buttons)) {
    _classPrivateFieldGet(this, _options).buttons = [];
  }

  if (_classPrivateFieldGet(this, _options).buttons.length === 0 && _classPrivateFieldGet(this, _options).defaultButton === true) {
    // add default button
    _classPrivateFieldGet(this, _options).buttons = [_classStaticPrivateFieldSpecGet(modbox, modbox, _defaultButtonOptions)];
  } else {
    // hide footer when there are no buttons
    _classPrivateFieldGet(this, _footer).classList.add('d-none');
  }

  _classPrivateFieldGet(this, _options).buttons.forEach(function (userBtnOptions) {
    return _this3.addButton(userBtnOptions);
  });
}

function _addEvents2() {
  var _this4 = this;

  Object.entries(_classPrivateFieldGet(this, _options).events).forEach(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        type = _ref3[0],
        fn = _ref3[1];

    _this4.addEvent(type, fn);
  });

  if (_classPrivateFieldGet(this, _options).destroyOnClose === true) {
    this.addEvent('hidden', function () {
      return _this4.destroy();
    });
  }
}

_defineProperty(modbox, "version", '1.6.2');

var _bootstrapModal = {
  writable: true,
  value: void 0
};
var _defaultOptions = {
  writable: true,
  value: {
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
    sanitizer: _classStaticPrivateMethodGet(modbox, modbox, _sanitizeString)
  }
};
var _defaultButtonOptions = {
  writable: true,
  value: {
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
  }
};
var _modalDefaults = {
  writable: true,
  value: {
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
        id: _classStaticPrivateMethodGet(modbox, modbox, _getUID).call(modbox, 'modbox-input-')
      }
    }
  }
};
