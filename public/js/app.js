let socket; 

const app = {
    init: () => {
        app.initSocketIo();
        app.createEvent();
    },
    initSocketIo: () => {
        socket = io();
        socket.on('chat message server', app.newChatMessagePrint);
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
    newChatMessagePrint: (msg) => {
        let newMsg = document.createElement('li');
        const  messages = document.getElementById('messages');
        newMsg.textContent = msg;
        messages.appendChild(newMsg);
        window.scrollTo(0, document.body.scrollHeight);
    }
}


document.addEventListener("DOMContentLoaded", app.init);
