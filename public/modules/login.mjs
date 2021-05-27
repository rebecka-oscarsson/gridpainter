export function displayLoginForm(element, socket) {
    const loginForm = `<h1>Welcome to gridpainter!</h1>
<form id="loginForm">
<label for="nameField">Choose your nickname</label>
<input type="text" id="nameField" placeholder="MyName" name="username"></input>
<button type="submit">login</button>`;
    element.insertAdjacentHTML("afterbegin", loginForm);
    document.getElementById("loginForm").addEventListener("submit", (e) => {e.preventDefault(); sendUsername(socket);document.querySelector("#loginForm").innerHTML = ""});
}

//sends the name from the login form
function sendUsername(socket) {
    let username = document.getElementById("nameField").value;
    console.log("name sent to backend: ", username)
    socket.emit("newUser", username);
}