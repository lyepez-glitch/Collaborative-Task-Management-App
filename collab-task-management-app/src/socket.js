const { io } = require('socket.io-client');

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000';

const socket = io(URL);

module.exports = { socket }; // Use ES module export