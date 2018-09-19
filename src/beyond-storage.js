let _storageCounter = 0;

const _DEFAULT_SETTINGS = {
  prefix: 'BeyondStorage_',
  name: null,
  sessionStorage: false,
};

class BeyondStorage {
  constructor(options = {}) {
    this.settings = {};

    for (const setting in _DEFAULT_SETTINGS) {
      if (_DEFAULT_SETTINGS.hasOwnProperty(setting)) {
        this.settings[setting] = _DEFAULT_SETTINGS[setting];
      }
    }

    for (const setting in options) {
      if (options.hasOwnProperty(setting)) {
        this.settings[setting] = options[setting];
      }
    }

    if (!this.settings.name) {
      this.settings.name = _storageCounter;
      _storageCounter += 1;
    }
  }

  _isObject(object) {
    if (object === null) { return false;}
    return ((typeof object === 'function') || (typeof object === 'object'));
  }

  _isInt(value) {
    var x;
    return isNaN(value) ? !1 : (x = parseFloat(value), (0 | x) === x);
  }

  _isFunction(func) {
    return func && {}.toString.call(func) === '[object Function]';
  }

  get storageMethod() {
    return (this.settings.sessionStorage) ? window.sessionStorage : window.localStorage;
  }

  set storage(data) {
    this.storageMethod.setItem(this.settings.prefix + this.settings.name, JSON.stringify(data));
  }

  get storage() {
    return (this.storageMethod.getItem(this.settings.prefix + this.settings.name)) ? JSON.parse(this.storageMethod.getItem(this.settings.prefix + this.settings.name)) : {};
  }

  delete(label) {
    const storage = this.storage;
    delete storage[label];
    this.storage = storage;
  }

  deleteAll() {
    this.storage = {};
  }

  createFileObject(data = null, expirationTime = 0) {
    return {
      exp: expirationTime,
      crtd: parseInt(Date.now() / 1000),
      data: (data || false),
    };
  }

  set(label = 'data', data = null, expirationTime = 0) {
    const storage = this.storage;

    if (this._isObject(label)) {
      for (const labelAmongMany in label) {
        if (label.hasOwnProperty(labelAmongMany)) {
          expirationTime = (this._isInt(data) && data > 0) ? data : expirationTime;
          storage[labelAmongMany] = this.createFileObject(label[labelAmongMany], expirationTime);
        }
      }

    } else {
      storage[label] = this.createFileObject(data, expirationTime);
    }

    this.storage = storage;
  }

  get(label = 'data', rawFile = false) {
    const file = this.storage[label];

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

  each(callback) {
    const storage = this.storage;

    if (this._isFunction(callback)) {
      for (const key in storage) {
        if (storage.hasOwnProperty(key)) {
          callback(key, storage[key].data);
        }
      }
    }
  }

  get keys() {
    const keys = [];

    this.each(key => {
      keys.push(key);
    });

    return keys;
  }

  UTF8ByteSize() {
    const storageString = (this.storageMethod.getItem(this.settings.prefix + this.settings.name)) ? this.storageMethod.getItem(this.settings.prefix + this.settings.name) : {};
    return encodeURI(storageString).split(/%..|./).length - 1;
  }
}

module.exports = BeyondStorage;
