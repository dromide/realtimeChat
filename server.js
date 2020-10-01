const path = require("path");
const http = require("http");
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'ChatCord Bot';

//Run when client connects
io.on('connection', socket => {
    // console.log('New WS Connection...');

    // Welcome current user
    // socket.emit('message', 'Welcome to ChatCord!');
    socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));

    // Bordacast when a ouser connects
    socket.broadcast.emit('message', formatMessage(botName, 'A user has joined the chat'));

    // Runs when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(botName, 'A User has left the chat'));
    });

    // Listen for chatMessage
    socket.on('chatMessage', msg => {
        // console.log(msg);
        io.emit('message', formatMessage('USER', msg));
    });

});

const PORT = 3000 || process.env.PORT;

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));