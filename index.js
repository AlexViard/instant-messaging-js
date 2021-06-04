const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

// Configuration de Socket.io
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static("public"));

io.on('connection', (socket) => {
    console.log('User connected.');

    socket.on('chat message user', (msg) => {
        io.emit('chat message server', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected.');
    });
});

server.listen(3000, () => {
    console.log(`App run in port 3000`);
})

