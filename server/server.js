const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
//setup for Heroku or local environment
const port = process.env.PORT || 3000;

//setting up express
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  // socket.emit('newEmail', {
  //   from: 'mike@example.com',
  //   text: 'Hey, what is going on?',
  //   createdAt: 123
  // });

  // socket.emit('newMessage', {
  //   from: 'Mike',
  //   text: 'Hi this is Mike',
  //   createdAt: 123
  // });

  // socket.on('createEmail', (newEmail) => {
  //   console.log('createEmail', newEmail);
  // });

  //listener for the join event - located in chat.js
  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required');
    }


    socket.join(params.room);
    // socket.leave('The Office Fans');
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    // io.emit - emits it to every user
    // io.to('The Office Fans').emit - emits it to every user in the 'The Office Fans' room
    // socket.broadcast.emit - emits it to everyone connected to the socket server except for the current one
    // socket.broadcast.to('The Office Fans').emit - emits it to everyone in the 'The Office Fans' room except for the current one
    // socket.emit - emits it specifically to one user

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
    callback();
  });

  //listener for the createMessage event
  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);

    //io emits to every single connection; socket emits to only a single connection
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
