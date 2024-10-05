import './style.css';
import {connectToServer} from "./socket-client.ts";


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>Websockets - Client</h2>
    
    <input type="text" id="jwt-token" placeholder="JWT"/>
    <button id="connect-button">Connect</button>
    <br>
    
    <span id="server-status">Offline</span>
    
    <ul id="clients-ul"></ul>
    
    <form id="message-form">
        <input type="text" id="message-input" placeholder="message"/>
        <button type="submit">Send</button>    
    </form>
    
    <h3>Messages</h3>
    <ul id="messages-ul"></ul>
  </div>
`
const inputJwt = document.querySelector<HTMLInputElement>('#jwt-token')!;
const connectButton = document.querySelector<HTMLButtonElement>('#connect-button')!;

connectButton.addEventListener('click', () => {
    const token = inputJwt.value.trim();
    if (!token) return;
    connectToServer(token);
});
// connectToServer();