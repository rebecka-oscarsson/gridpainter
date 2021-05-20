const socket = io()

export function displayLoginForm(element) {
    const loginForm = `<h1>Welcome to gridpainter!</h1>
<form id="loginForm">
<label for="nameField">Choose your nickname</label>
<input type="text" id="nameField" placeholder="MyName" name="username"></input>
<button type="submit">login</button>`;
    element.insertAdjacentHTML("afterbegin", loginForm);
    document.getElementById("loginForm").addEventListener("submit", sendUsername);
}

function sendUsername(e) {
    e.preventDefault();
    let username = document.getElementById("nameField").value;
    console.log("name sent to backend: ", username)
    socket.emit("newUser",
        username);
}

export function messageIfFull(element, userObject) {
    if (userObject) {
        console.log("object sent to chat: ", userObject)
        socket.emit('join', userObject)//for the chat
    } else {
        element.innerHTML = "the game is full";
    }
}