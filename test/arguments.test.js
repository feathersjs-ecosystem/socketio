// import assert from 'assert';
import feathers from 'feathers';
import io from 'socket.io-client';
import socketio from '../src';

let port = 3000;
function getUniquePort () {
  return port++;
}

describe('Arguments', function () {
  const options = { path: '/ws/' };
  const callback = (io) => io.on('connection', (socket) => {
    socket.emit('event');
  });

  describe('No arguments', function () {
    const port = getUniquePort();
    const app = feathers().configure(socketio());
    const socket = io('http://localhost:' + port);

    it('should be connected', (done) => {
      let server = app.listen(port);
      app.setup(server);
      server.on('listening', () => {
        socket.on('connect', done);
      });
    });
  });

  describe('Pass options', function () {
    const port = getUniquePort();
    const app = feathers().configure(socketio(options));
    const socket = io('http://localhost:' + port, options);

    it('should be connected', (done) => {
      const server = app.listen(port);
      app.setup(server);
      server.on('listening', () => {
        socket.on('connect', done);
      });
    });
  });

  describe('Pass callback', function () {
    const port = getUniquePort();
    const app = feathers().configure(socketio(callback));
    const socket = io('http://localhost:' + port);

    it('should be connected', (done) => {
      const server = app.listen(port);
      app.setup(server);
      server.on('listening', () => {
        socket.once('event', done);
      });
    });
  });

  describe('Pass options and callback', function () {
    const port = getUniquePort();
    const app = feathers().configure(socketio(options, callback));
    const socket = io('http://localhost:' + port, options);

    it('should be connected', (done) => {
      const server = app.listen(port);
      app.setup(server);
      server.on('listening', () => {
        socket.once('event', done);
      });
    });
  });

  describe('Pass port and options', function () {
    const socketPort = getUniquePort();
    const appPort = getUniquePort();
    const app = feathers().configure(socketio(socketPort, options));
    const socket = io('http://localhost:' + socketPort, options);

    it('should be connected', (done) => {
      const server = app.listen(appPort);
      app.setup(server);
      server.on('listening', () => {
        socket.on('connect', done);
      });
    });
  });

  describe('Pass port and callback', function () {
    const socketPort = getUniquePort();
    const appPort = getUniquePort();
    const app = feathers().configure(socketio(socketPort, callback));
    const socket = io('http://localhost:' + socketPort);

    it('should be connected', (done) => {
      const server = app.listen(appPort);
      app.setup(server);
      server.on('listening', () => {
        socket.once('event', done);
      });
    });
  });

  describe('Pass port, options and callback', function () {
    const socketPort = getUniquePort();
    const appPort = getUniquePort();
    const app = feathers().configure(socketio(socketPort, options, callback));
    const socket = io('http://localhost:' + socketPort, options);

    it('should be connected', (done) => {
      const server = app.listen(appPort);
      app.setup(server);
      server.on('listening', () => {
        socket.once('event', done);
      });
    });
  });
});
