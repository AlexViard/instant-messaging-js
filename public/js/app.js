let socket; 
let username;

const app = {
    init: () => {
        
        while (!username) {
            username = prompt("Entrez votre pseudo", "");
        }

        app.initSocketIo();
        app.createEvent();

    },
    initSocketIo: () => {
        socket = io();
        socket.on('chat message server', app.newChatMessagePrint);
        socket.emit('new user', username);
        socket.on('user connect print', app.newMessageServer);
        socket.on('user disconnect print', app.newMessageServer);
    },
    createEvent: () => {
        const form = document.getElementById('form');
        
        form.addEventListener('submit', app.newChatMessageSend);
    },
    newChatMessageSend: (e) => {
        e.preventDefault();
        const input = document.getElementById('input');
        if (input.value){
            socket.emit('chat message user', input.value);
            input.value = '';
        }
    },
    newChatMessagePrint: (username, msg) => {
        let newMsg = document.createElement('li');
        const messages = document.getElementById('messages');
        newMsg.textContent = `${username} : ${msg}`;
        messages.appendChild(newMsg);
        window.scrollTo(0, document.body.scrollHeight);
    },
    newMessageServer: (msgServ) => {
        let newMsg = document.createElement('li');
        const messages = document.getElementById('messages');
        newMsg.textContent = msgServ;
        newMsg.style.color = '#FFCC00';
        messages.appendChild(newMsg);
        window.scrollTo(0, document.body.scrollHeight); 
    },
    userDisconnect: (username) => {
        
    }
}


document.addEventListener("DOMContentLoaded", app.init);
