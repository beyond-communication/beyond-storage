(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["BeyondStorage"] = factory();
	else
		root["BeyondStorage"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _storageCounter = 0;

var _DEFAULT_SETTINGS = {
  prefix: 'BeyondStorage_',
  name: null,
  sessionStorage: false
};

var BeyondStorage = function () {
  function BeyondStorage() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, BeyondStorage);

    this.settings = {};

    for (var setting in _DEFAULT_SETTINGS) {
      if (_DEFAULT_SETTINGS.hasOwnProperty(setting)) {
        this.settings[setting] = _DEFAULT_SETTINGS[setting];
      }
    }

    for (var _setting in options) {
      if (options.hasOwnProperty(_setting)) {
        this.settings[_setting] = options[_setting];
      }
    }

    if (!this.settings.name) {
      this.settings.name = _storageCounter;
      _storageCounter += 1;
    }
  }

  _createClass(BeyondStorage, [{
    key: '_isObject',
    value: function _isObject(object) {
      if (object === null) {
        return false;
      }
      return typeof object === 'function' || (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object';
    }
  }, {
    key: '_isInt',
    value: function _isInt(value) {
      var x;
      return isNaN(value) ? !1 : (x = parseFloat(value), (0 | x) === x);
    }
  }, {
    key: '_isFunction',
    value: function _isFunction(func) {
      return func && {}.toString.call(func) === '[object Function]';
    }
  }, {
    key: 'delete',
    value: function _delete(label) {
      var storage = this.storage;
      delete storage[label];
      this.storage = storage;
    }
  }, {
    key: 'deleteAll',
    value: function deleteAll() {
      this.storage = {};
    }
  }, {
    key: 'createFileObject',
    value: function createFileObject() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var expirationTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      return {
        exp: expirationTime,
        crtd: parseInt(Date.now() / 1000),
        data: data || false
      };
    }
  }, {
    key: 'set',
    value: function set() {
      var label = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'data';
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var expirationTime = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      var storage = this.storage;

      if (this._isObject(label)) {
        for (var labelAmongMany in label) {
          if (label.hasOwnProperty(labelAmongMany)) {
            expirationTime = this._isInt(data) && data > 0 ? data : expirationTime;
            storage[labelAmongMany] = this.createFileObject(label[labelAmongMany], expirationTime);
          }
        }
      } else {
        storage[label] = this.createFileObject(data, expirationTime);
      }

      this.storage = storage;
    }
  }, {
    key: 'get',
    value: function get() {
      var label = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'data';
      var rawFile = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var file = this.storage[label];

      if (file) {
        if (file.exp && file.crtd + file.exp <= parseInt(Date.now() / 1000)) {
          this.delete(label);
          return false;
        } else {
          return (rawFile ? file : file.data) || false;
        }
      } else {
        return false;
      }
    }
  }, {
    key: 'each',
    value: function each(callback) {
      var storage = this.storage;

      if (this._isFunction(callback)) {
        for (var key in storage) {
          if (storage.hasOwnProperty(key)) {
            callback(key, storage[key]);
          }
        }
      }
    }
  }, {
    key: 'UTF8ByteSize',
    value: function UTF8ByteSize() {
      var storageString = this.storageMethod.getItem(this.settings.prefix + this.settings.name) ? this.storageMethod.getItem(this.settings.prefix + this.settings.name) : {};
      return encodeURI(storageString).split(/%..|./).length - 1;
    }
  }, {
    key: 'storageMethod',
    get: function get() {
      return this.settings.sessionStorage ? window.sessionStorage : window.localStorage;
    }
  }, {
    key: 'storage',
    set: function set(data) {
      this.storageMethod.setItem(this.settings.prefix + this.settings.name, JSON.stringify(data));
    },
    get: function get() {
      return this.storageMethod.getItem(this.settings.prefix + this.settings.name) ? JSON.parse(this.storageMethod.getItem(this.settings.prefix + this.settings.name)) : {};
    }
  }, {
    key: 'keys',
    get: function get() {
      var keys = [];

      this.each(function (key) {
        keys.push(key);
      });

      return keys;
    }
  }]);

  return BeyondStorage;
}();

module.exports = BeyondStorage;

/***/ })
/******/ ]);
});