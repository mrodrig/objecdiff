# An object difference library for NodeJS

**This module can compares two objects and return the key that has changed along with the original and updated values.**

[![Dependencies](https://img.shields.io/david/mrodrig/objecdiff.svg?style=flat-square)](https://www.npmjs.org/package/objecdiff)
[![Build Status](https://travis-ci.org/mrodrig/objecdiff.svg?branch=master)](https://travis-ci.org/mrodrig/objecdiff)
[![Downloads](http://img.shields.io/npm/dm/objecdiff.svg)](https://www.npmjs.org/package/objecdiff)
[![NPM version](https://img.shields.io/npm/v/objecdiff.svg)](https://www.npmjs.org/package/objecdiff)
[![Maintainability](https://api.codeclimate.com/v1/badges/a10c14045f3d45d32b76/maintainability)](https://codeclimate.com/github/mrodrig/objecdiff/maintainability)

## Installation

```bash
$ npm install objecdiff
```

## Usage

```javascript
const objecdiff = require('objecdiff');

// Alternatively:
import { diff } from 'objecdiff';
```

### API

#### diff(original, updated) Documentation

```javascript
objecdiff.diff(objectA, objectB)

// Alternatively if using the `import` method shown above:
diff(objectA, objectB)
```

* `objectA` - `Object` - The original or first object that you would like to compare.
* `objectB` - `Object` - The updated or second object that you would like to compare the first against.

#### Example

```javascript
import { diff } from 'objecdiff';

let a = {
        firstName: 'Mike',
        lastName: 'R',
        city: 'Boston'
    },
    b = {
        firstName: 'Dan',
        name: 'Dan G',
        color: {
            favorite: 'blue'
        },
        city: 'Boston'
    };

console.log(diff(a, b));
// => [ { path: 'firstName', original: 'Mike', updated: 'Dan' },
// =>   { path: 'lastName', original: 'R', updated: undefined },
// =>   { path: 'name', original: undefined, updated: 'Dan G' },
// =>   { path: 'color.favorite', original: null, updated: 'blue' } ]
```

## Tests

```bash
$ npm test
```

_Note_: This requires `mocha`.

To see test coverage, please run:
```bash
$ npm run coverage
```

Current Coverage is:
```
<Tests coming soon.>
```

## Features
* Natively supports nested documents
* Compares the objects and returns the key that has changed along with the original and updated values
