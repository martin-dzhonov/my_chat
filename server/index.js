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
    const allUsers = getAllUsers();

    if(error) return callback(error);

    socket.join('chat');

    socket.emit('message', { user: 'admin', text: ` Welcome, ${user.name} !`});
    socket.broadcast.to('chat').emit('message', { user: 'admin', text: `${user.name} has joined!` });
    io.to('chat').emit('chatData', { users: allUsers })

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    io.to('chat').emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    const allUsers = getAllUsers();

    if(user) {
      io.to('chat').emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to('chat').emit('chatData', { users: allUsers });
    }
  })
});

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));