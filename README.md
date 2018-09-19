# beyond-storage

🔠 - An easier interface for storing data in localStorage or sessionStorage.

## Installation

#### npm:
```bash
npm install beyond-storage
```

#### HTML:
```html
<script src="beyond-storage.min.js"></script>
```

## Usage

#### ES6:
```javascript
import BeyondStorage from 'beyond-storage';

const storage = new BeyondStorage();
```

#### Browser:
```javascript
BeyondStorage
// or
window.BeyondStorage

// i.e
var storage = new BeyondStorage();
```

## Example

```javascript
import BeyondStorage from 'beyond-storage';

const storage = new BeyondStorage({
  // See section 'Settings'
});

// Store a value
storage.set('key', 'value');

let storedValue = storage.get('key');

console.log(storedValue);
// "value"
```

## Settings

```javascript
var storage = new BeyondStorage({
  // Settings here
});
```

| Setting | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `String` | `null` | Namespace to use in the storage. Use `null` for self-incrementing integer. |
| `prefix` | `String` | "BeyondStorage_" | A prefix to prepend to the storage namespace. |
| `sessionStorage` | `Boolean` | `false` | Whether to use localStorage or sesstionStorage. |

## API

### Methods

#### `set(label, data, expirationTime)`

Set some data to the storage.

**Parameters**

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `String` | "data" | Key under which to store the data. |
| `data` | `String`/`Number`/`Array`/`Object` | `null` | Data to store. |
| `expirationTime` | `Integer` | 0 | If more than 0, then seconds until data expires and will be deleted. |

If the first argument instead is an object, you can set multiple values at once. The second argument then becomes the expiration time. Example:

```javascript
const storage = new BeyondStorage();

storage.set({
  color: '#00FF00',
  size: 4,
  numbers: [3, 1, 2, 1]
}, 60);

console.log(storage.get('size'));
// 4
// ... Wait for 60 seconds...
console.log(storage.get('size'));
// false
```

**Returns**

`undefined`

#### `get(label, rawFile)`

Get some data from the storage.

**Parameters**

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `String` | "data" | Key to find data. |
| `rawFile` | `Boolean` | `false` | Whether to return just the data or the whole file with metadata, such as creation time and set expiration time. |

**Returns**

The stored data of the key/label.

#### `delete(label)`

Delete stored data in storage.

**Parameters**

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `String` | `undefined` | Key to which data to delete. |

**Returns**

`undefined`

#### `deleteAll()`

Deletes all in the storage.

**Returns**

`undefined`

#### `each(callback)`

Run a function for each file in the storage.

**Parameters**

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `callback` | `Function` | `undefined` | Function to run for each file in the storage. The key and its value will be passed as arguments. |

**Returns**

`undefined`

#### `UTF8ByteSize()`

Return byte size of storage.

**Returns**

`Number` Number of bytes.


### Properties

#### `settings`

`Object` All the settings for the instance.

#### `keys`

`Array` All keys in storage in an array.