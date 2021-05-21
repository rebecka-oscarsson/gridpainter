<<<<<<< HEAD
import {chatFrontEnd, chatWindow} from '../modules/frontendchat.mjs'
=======
import {chatFrontEnd} from '../modules/frontendchat.mjs'
import { displayLoginForm, messageIfFull} from '../modules/login.mjs';//Rebecka
>>>>>>> 2db383969ebb83b77552f49249671aeb5da0e2b3

let size = 25;
let items = [];
let containerEL = document.getElementById("container");
const userColor = "green";
const socket = io();

displayLoginForm(containerEL);//Rebecka
socket.on("loggedIn", userObject => {messageIfFull(containerEL, userObject)}); //Rebecka. Displays message if full, else sends userobject

socket.on("currentBoard", board => {//when we join the app we get sent the current board
    console.log(board);
    items = board;
    items.forEach(element => { //we go over all the objects that were sent to us
        containerEL.insertAdjacentHTML("beforeend",element.html)//we create each square 
        document.getElementById(element.id).style.backgroundColor = element.color //we sert the current color value
        document.getElementById(element.id).addEventListener("click", function(){color(this.id,userColor);}) //and we add the event listiner to change color
    });
})

socket.on("newTile", (update) =>{//when tile changes every one gets a message "newTile"
    console.log("newtile");
    items[update.id].color = update.color; //im not sure if this is requierd
    console.log(update);
    document.getElementById(update.id).style.backgroundColor = update.color;//we get what tile was changed and update that tile on the front end
  })



let color = function(id, color){ // when we click we get the id and the users color
    let el = document.getElementById(id); // we get the tile on the frontend
    console.log(el.style.backgroundColor);
    if (el.style.backgroundColor != color) {//if the current tile color dose not eaqual the user color we cange it to the usercolor
        socket.emit("updateTile", {id:id, color:color});// we send a mesage with what color to change
    }
    else{// elese we change it to white
        socket.emit("updateTile", {id:id, color:"white"});
    }
    console.log(items);
}
<<<<<<< HEAD

chatWindow()

// chatUserInterface()
chatFrontEnd("Kalle", "blue")
// joinChat("Kalle", "blue")
// messageOutput()
=======
>>>>>>> 2db383969ebb83b77552f49249671aeb5da0e2b3
