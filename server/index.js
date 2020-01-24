const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const router = require('./router');
const app = express();
const server = http.createServer(app);
const io = socketio(server);




const { addUser, getUser, deactivateUser, getAllUsers } = require('./users');

app.use(cors());
app.use(router);

io.on('connect', (socket) => {
  socket.on('join', ({ name }, callback) => {
    const { error, user } = addUser({ id: socket.id, name: name });
    const allUsers = getAllUsers();

    if(error) return callback(error);

    socket.join('chat');

    socket.emit('message', { user: 'admin', text: ` Welcome, ${user.name} !`});
    socket.broadcast.to('chat').emit('message', { user: 'admin', text: `${user.name} has joined!` });
    io.to('chat').emit('chatData', { users: allUsers })

    callback();
  });

  socket.on('sendMessage', (data, callback) => {
    io.to('chat').emit('message', { user: data.user, text: data.message });

    callback();
  });


  socket.on('logout', (message, callback) => {
    const user = deactivateUser(socket.id);
    const allUsers = getAllUsers();
    if(user) {
      io.to('chat').emit('message', { user: 'Admin', text: `${user.name} has gone offline.` });
      io.to('chat').emit('chatData', { users: allUsers });
    }

    callback();
  })
});

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));