const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

// Configuration de Socket.io
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static("public"));

io.on('connection', async (socket)  => {
    console.log('user connect');

    const sockets = await io.fetchSockets();

    const usersList = sockets.reduce((acc, socket) => {
        if (socket.username) {
          acc.push({
            id: socket.id,
            username: socket.username,
          });
        }
        return acc;
      }, []);

      io.emit('user print online', usersList);

  
    socket.on('new user', (username) => {
        socket.username = username;
        io.emit('user connect print', `${username} vient de se connecter.`);
        io.emit('new user print', {id: socket.id, username: socket.username})
    })

    socket.on('chat message user', (msg) => {
        io.emit('chat message server', socket.username, msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected.');
        io.emit('user disconnect print', `${socket.username} vient de ce deconnecter.`)
        io.emit('remove user', {id: socket.id});
    });
});

server.listen(3000, () => {
    console.log(`App run in port 3000`);
})

