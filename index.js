const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

// Configuration de Socket.io
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static("public"));

io.on('connection', (socket) => {
    console.log('user connect');
    socket.on('new user', (username) => {
        socket.username = username;
        io.emit('user connect print', `${username} vient de se connecter.`);
    })

    socket.on('chat message user', (msg) => {
        io.emit('chat message server', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected.');
        io.emit('user disconnect print', `${socket.username} vient de ce deconnecter.`)
    });
});

server.listen(3000, () => {
    console.log(`App run in port 3000`);
})

