const socket = io()
import {chatFrontEnd} from '../modules/frontendchat.mjs'


export function displayLoginForm(element) {
    const loginForm = `<h1>Welcome to gridpainter!</h1>
<form id="loginForm">
<label for="nameField">Choose your nickname</label>
<input type="text" id="nameField" placeholder="MyName" name="username"></input>
<button type="submit">login</button>`;
    element.insertAdjacentHTML("afterbegin", loginForm);
    document.getElementById("loginForm").addEventListener("submit", sendUsername);
}

//sends the name from the login form
function sendUsername(e) {
    e.preventDefault();
    let username = document.getElementById("nameField").value;
    console.log("name sent to backend: ", username)
    socket.emit("newUser",
        username);
}

export function messageIfFull(element, userObject) {
    if (userObject) {//the backend returns null if the chat is full
        console.log("object sent to chat: ", userObject)
        chatFrontEnd(userObject.username, userObject.color)
        socket.emit('saveUser', userObject);
        //for saving the users color in app.js so that usernames can be removed on disconnect
    } else {
        element.innerHTML = "the game is full";
    }
}