const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const { addUser, removeUser, getUser, getAllUsers } = require('./users');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

io.on('connect', (socket) => {
  socket.on('join', ({ name }, callback) => {
    const { error, user } = addUser({ id: socket.id, name });

    if(error) return callback(error);

    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: ` Welcome, ${user.name} !`});
    socket.emit('message', { user: 'admin', text: `${user.name} has joined the chat!` });

    socket.emit('chatData', { getAllUsers() });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    socket.emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      socket.emit('message', { user: 'Admin', text: `${user.name} has left.` });
      socket.emit('chatData', { getAllUsers() });
    }
  })
});

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));