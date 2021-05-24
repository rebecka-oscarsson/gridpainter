import {
    chatFrontEnd
} from '../modules/frontendchat.mjs'


export function displayLoginForm(element, socket) {
    const loginForm = `<h1>Welcome to gridpainter!</h1>
<form id="loginForm">
<label for="nameField">Choose your nickname</label>
<input type="text" id="nameField" placeholder="MyName" name="username"></input>
<button type="submit">login</button>`;
    element.insertAdjacentHTML("afterbegin", loginForm);
    document.getElementById("loginForm").addEventListener("submit", (e)=>{e.preventDefault();sendUsername(socket)});
}

//sends the name from the login form
function sendUsername(e) {
    // e.preventDefault();
    let username = document.getElementById("nameField").value;
    console.log("name sent to backend: ", username)
    e.emit("newUser", username);
}

export function messageIfFull(userObject, container, socket) {
    socket.on("gameFull", (msg) => {
        container.innerHTML = msg;
    })
    if (userObject) {
        console.log("sent to chat: ", userObject.username, userObject.color)
        chatFrontEnd(userObject.username, userObject.color);
    }
}