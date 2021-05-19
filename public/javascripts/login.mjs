export function displayLoginForm(element) {
    const loginForm = `<h1>Welcome to gridpainter!</h1>
<form id="loginForm">
<label for="nameField">Choose your nickname</label>
<input type="text" id="nameField" placeholder="MyName" name="username"></input>
<button type="submit">login</button>`;
    element.insertAdjacentHTML("afterbegin", loginForm);
}

export function sendUsername(socket) {
    let username = document.getElementById("nameField").value;
    console.log("user: ", username)
    socket.emit("newUser",
        username);
}