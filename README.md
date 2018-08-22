# @feathersjs/socketio

> __Important:__ The code for this module has been moved into the main Feathers repository at [feathersjs/feathers](https://github.com/feathersjs/feathers) ([package direct link](https://github.com/feathersjs/feathers/tree/master/packages/socketio)). Please open issues and pull requests there.

[![Build Status](https://travis-ci.org/feathersjs/socketio.png?branch=master)](https://travis-ci.org/feathersjs/socketio)

The Feathers Socket.io real-time API provider

## Installation

```
npm install @feathersjs/socketio --save
```

## Quick example

```js
const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio');

const app = feathers();

app.configure(socketio());

app.listen(3030);
```

## Documentation

Please refer to the [@feathersjs/socketio documentation](https://docs.feathersjs.com/api/socketio.html) for more details.

## License

Copyright (c) 2018

Licensed under the [MIT license](LICENSE).
