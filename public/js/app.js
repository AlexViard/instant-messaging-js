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
        socket.on('new user print', app.addNewUserOnline);
        socket.on('user connect print', app.newMessageServer);
        socket.on('user print online', app.newUserOnline);
        socket.on('user disconnect print', app.newMessageServer);
        socket.on('remove user', app.removeUserDisconnect); 
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
    newUserOnline: (socketList) => {
        console.log(socketList);
        if (socketList.length){
            socketList.forEach((socket) => {
                console.log(socket);
                app.addNewUserOnline(socket);
            }); 
        }
    },
    addNewUserOnline: (socket) => {
        const result = document.querySelector(`[data-user-id="${socket.id}"]`);
        
        if (!result) {
            const divUserOnline = document.getElementById('userOnline');
            const divOneUserOnline = document.createElement('div');
            const icon = document.createElement('i');
            const span = document.createElement('span');

            divOneUserOnline.dataset.userId = socket.id;
            divOneUserOnline.classList.add('one-user-online');

            icon.classList.add("fas", "fa-user", "tag-online");
            span.textContent = socket.username;

            divOneUserOnline.appendChild(icon);
            divOneUserOnline.appendChild(span);
            divUserOnline.appendChild(divOneUserOnline);
        }
    },
    removeUserDisconnect: (socket) => {
        const user = document.querySelector(`[data-user-id="${socket.id}"]`);
        user.remove();
    }
}


document.addEventListener("DOMContentLoaded", app.init);
