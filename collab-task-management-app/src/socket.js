const { io } = require('socket.io-client');


const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000';

const socket = io(URL);

module.exports = { socket }; // Use ES module export