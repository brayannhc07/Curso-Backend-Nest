import {Manager, Socket} from "socket.io-client";

let socket: Socket;

export const connectToServer = (token: string) => {
    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js', {
        extraHeaders: {
            authorization: token
        }
    });
    socket?.removeAllListeners();
    socket = manager.socket('/');
    addListeners();
};

const addListeners = () => {
    const serverStatusLabel = document.querySelector<HTMLSpanElement>('#server-status')!;
    const clientsUl = document.querySelector<HTMLUListElement>('#clients-ul')!;
    const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
    const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')!;

    socket.on('connect', () => {
        serverStatusLabel.textContent = 'Online';
    });

    socket.on('disconnect', () => {
        serverStatusLabel.textContent = 'Offline';
    });

    socket.on('clients-updated', (clients: string[]) => {
        clientsUl.innerHTML = '';
        clients.forEach(clientId => {
            const li = document.createElement('li');
            li.textContent = clientId;
            clientsUl.appendChild(li);
        });
    });

    messageForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const message = messageInput.value.trim();
        if (!message) return;
        socket.emit('message-from-client', {message});
        messageInput.value = '';
    });

    socket.on('message-from-server', (payload: { fullName: string, message: string }) => {
        const li = document.createElement('li');
        li.textContent = `${payload.fullName}: ${payload.message}`;
        messagesUl.appendChild(li);
    });
}