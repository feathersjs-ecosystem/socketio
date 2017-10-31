import makeDebug from 'debug';
import socketio from 'socket.io';
import Proto from 'uberproto';
import socket from 'feathers-socket-commons';

const debug = makeDebug('feathers-socketio');

export default function (port, options, config) {
  if (typeof port !== 'number') {
    config = options;
    options = port;
    port = null;
  }

  if (typeof options !== 'object') {
    config = options;
    options = {};
  }

  return function () {
    const app = this;

    if (app.version && app.version >= '3.0.0') {
      throw new Error(`feathers-socketio is not compatible with Feathers v${app.version}. Use the latest version of @feathersjs/socketio instead.`);
    }

    app.configure(socket('io'));

    Proto.mixin({
      setup (server) {
        let io = this.io;

        if (!io) {
          io = this.io = socketio.listen(port || server, options);

          io.use(function (socket, next) {
            socket.feathers = { provider: 'socketio' };
            next();
          });
        }

        this._socketInfo = {
          method: 'emit',
          connection () {
            return io.sockets;
          },
          clients () {
            return io.sockets.sockets;
          },
          params (socket) {
            return socket.feathers;
          }
        };

        // In Feathers it is easy to hit the standard Node warning limit
        // of event listeners (e.g. by registering 10 services).
        // So we set it to a higher number. 64 should be enough for everyone.
        this._socketInfo.connection().setMaxListeners(64);

        if (typeof config === 'function') {
          debug('Calling SocketIO configuration function');
          config.call(this, io);
        }

        return this._super.apply(this, arguments);
      }
    }, app);
  };
}
