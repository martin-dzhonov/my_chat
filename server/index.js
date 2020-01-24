const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const router = require('./router');
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const { addUser, isLoggedIn, deactivateUser, getAllUsers} = require('./users');

app.use(cors());
app.use(router);

io.on('connect', (socket) => {
  socket.on('join', ({ name }, callback) => {
    const isActive = isLoggedIn(name);
    const { error, user } = addUser({ id: socket.id, name: name });
    const allUsers = getAllUsers();

    if(error) return callback(error);

    socket.join('chat');

    socket.emit('message', { user: 'Admin', text: ` Welcome, ${user.name} !`});
    io.to('chat').emit('chatData', { users: allUsers })
    if(!isActive){
      socket.broadcast.to('chat').emit('message', { user: 'Admin', text: `${user.name} has come online.` });
    }

    callback();
  });

  socket.on('sendMessage', (data, callback) => {
    io.to('chat').emit('message', { user: data.user, text: data.message });

    callback();
  });


  socket.on('logout', (data, callback) => {
    const user = deactivateUser(data.user);
    const allUsers = getAllUsers();
    if(user) {
      io.to('chat').emit('message', { user: 'Admin', text: `${user.name} has gone offline.` });
      io.to('chat').emit('chatData', { users: allUsers });
      io.to('chat').emit('logout', { user: user });
    }

    callback();
  })
});

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));