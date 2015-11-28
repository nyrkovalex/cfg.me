# cfg.me
Configuration loader for nodejs apps.

Loads configuration from provided JSON file into an immutable object accesible with `get()` function.

Can be used by both typescript and javascript apps.

# Installation

`npm install cfg.me`

# Usage

## JS
```javascript
// Starting module
var cfgMe = require('cfg.me');

// Must be called before any subsequent `get()` calls
var cfg = cfgMe.load('./path/to/config.json');
```
```javascript
// Some other module
var cfgMe = require('cfg.me');

function some() {
  // Do not use this at module level as it will throw if called before `load()`
  var cfg = cfgMe.get();
  var value = cfg.some.property;
}
```

## Typescript
```typescript
// Starting module
import * as cfgMe from 'cfg.me';

// Must be called before any subsequent `get()` calls
let cfg = cfgMe.load<CfgClass>('./path/to/config.json');
```
```typescript
// Some other module
import * as cfgMe from 'cfg.me';

function some() {
  // Do not use this at module level as it will throw if called before `load()`
  ley cfg = cfgMe.get<CfgClass>();
  let value = cfg.some.property;
}
```
