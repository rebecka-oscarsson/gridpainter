import { chatFrontEnd, chatWindow } from '../modules/frontendchat.mjs'
import { displayLoginForm } from '../modules/login.mjs';//Rebecka

let size = 25;
let items = [];
let containerEL = document.getElementById("container");
let boardEL = document.getElementById("board");
let userColor = null;
const socket = io();

//Displays login form
displayLoginForm(containerEL, socket);//Rebecka


//When game is full
socket.on("gameFull", msg => { 
    container.innerHTML = msg; 
})

//When logged in
socket.on("loggedIn", loggedInUser => {

    console.log("sent to chat: ", loggedInUser.username, loggedInUser.color);

    //stores color for individual user
    socket.on("userColor", color => userColor = color);

    //Creates Chat
    chatFrontEnd(loggedInUser.username, loggedInUser.color, socket);

    //Saves painting (How is is this funciton accessed?)
    makeCards();

    //Save button for painting
    saveBtn(loggedInUser.username);

})

//when we join the app we get sent the current board
socket.on("currentBoard", board => {
    console.log(board);
    document.getElementById("board").innerHTML = "";
    items = board;

    //we go over all the objects that were sent to us
    items.forEach(element => {

        //we create each square 
        boardEL.insertAdjacentHTML("beforeend", element.html)

        //we sert the current color value
        document.getElementById(element.id).style.backgroundColor = element.color

        //and we add the event listiner to change color
        document.getElementById(element.id).addEventListener("click", function () { 
            color(this.id, userColor);
        })
    });
})

//when tile changes every one gets a message "newTile"
socket.on("newTile", (update) => {
    console.log("newtile");

    //im not sure if this is requierd
    items[update.id].color = update.color;
    console.log(update);

    //we get what tile was changed and update that tile on the front end
    document.getElementById(update.id).style.backgroundColor = update.color;
})


// when we click we get the id and the users color
let color = function (id, color) {

    // we get the tile on the frontend
    let el = document.getElementById(id);
    console.log(el.style.backgroundColor);

    //if the current tile color dose not eaqual the user color we cange it to the usercolor
    if (el.style.backgroundColor != color) {

        // we send a mesage with what color to change
        socket.emit("updateTile", { id: id, color: color });
    }
    else {// elese we change it to white
        socket.emit("updateTile", { id: id, color: "white" });
    }
    console.log(items);
}

//Save btn for painting
function saveBtn(username) {
    let html = `<div><button id = "saveBtn">save</button></div>`;
    document.getElementById("container").insertAdjacentHTML('beforeend', html);
    document.getElementById("saveBtn").addEventListener("click", function () {
        let msg = { username: username };
        fetch("http://gridpainter.herokuapp.com/paintings/savepainting", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(msg)
        }).then(() => { console.log("lol"); })
    })
}

