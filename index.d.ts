import 'socket.io';

type FeatherSocketCallback =
  (io: any) => void;

type FeathersSockeOptions =
  SocketIO.ServerOptions |
  FeatherSocketCallback;


export default
  function (options: FeathersSockeOptions, config?: FeathersSockeOptions): () => void;
