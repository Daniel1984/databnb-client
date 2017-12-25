import io from 'socket.io-client';
import config from '../../config';

let socket;

const socketConfig = {
  init() {
    socket = io(`${config.apiUrl}`);

    socket.on('connect', () => {
      sessionStorage.setItem('socketId', socket.id);
    });

    socket.on('disconnect', () => {
      sessionStorage.removeItem('socketId');
    });
  },

  get() {
    return socket;
  },
};

export default socketConfig;
