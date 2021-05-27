import {chatFrontEnd, chatWindow} from '../modules/frontendchat.mjs'
import { displayLoginForm} from '../modules/login.mjs';//Rebecka

let size = 25;
let items = [];
let containerEL = document.getElementById("container");
let boardEL = document.getElementById("board");
let userColor = "green";
const socket = io();

let localhost = "http://localhost:3000"

displayLoginForm(containerEL, socket);//Rebecka
socket.on("gameFull", msg => {container.innerHTML = msg;})
socket.on("loggedIn", loggedInUser => {
console.log("sent to chat: ", loggedInUser.username, loggedInUser.color);
socket.on("userColor", color => userColor = color);//stores color for individual user
chatFrontEnd(loggedInUser.username, loggedInUser.color, socket);
saveBtn(loggedInUser.username);
makeCards();

})//Rebecka. Displays message if full, otherwise passes on userobject

socket.on("currentBoard", board => {//when we join the app we get sent the current board
    console.log(board);
    document.getElementById("board").innerHTML = "";
    items = board;
    items.forEach(element => { //we go over all the objects that were sent to us
        boardEL.insertAdjacentHTML("beforeend",element.html)//we create each square 
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

socket.on("updateSave",(item)=>{
    makeCard(item,item.userCreated);
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

let saveBtn = function(username){
   let html = `<div><button id = "saveBtn">save</button></div>`;
    document.getElementById("container").insertAdjacentHTML('beforeend',html);
    document.getElementById("saveBtn").addEventListener("click",function(){
        let msg = {username:username};
        fetch(localhost + "/paintings/savepainting", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(msg)
          }).then(()=>{console.log("lol");})
    })
}

chatWindow()
// chatFrontEnd()