# An object difference library for NodeJS

**This module can compares two objects and return the key that has changed along with the original and updated values.**

[![NPM version](https://img.shields.io/npm/v/objecdiff.svg)](https://www.npmjs.org/package/objecdiff)
[![Downloads](https://img.shields.io/npm/dm/objecdiff)](https://www.npmjs.org/package/objecdiff)
[![Minzipped Size](https://img.shields.io/bundlephobia/minzip/objecdiff)](https://bundlephobia.com/result?p=objecdiff)
[![Build Status](https://img.shields.io/github/actions/workflow/status/mrodrig/objecdiff/automated-tests-workflow.yml)](https://github.com/mrodrig/objecdiff/actions/workflows/automated-tests-workflow.yml)
[![Coverage Status](https://coveralls.io/repos/github/mrodrig/objecdiff/badge.svg?branch=main)](https://coveralls.io/github/mrodrig/objecdiff?branch=main)
[![Typings](https://img.shields.io/npm/types/objecdiff)](https://www.npmjs.org/package/objecdiff)

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

To see test coverage, please run:
```bash
$ npm run coverage
```

## Features
* Natively supports nested documents
* Compares the objects and returns the key that has changed along with the original and updated values
