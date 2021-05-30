import { chatFrontEnd} from '../modules/frontendchat.mjs'
import { displayLoginForm } from '../modules/login.mjs';//Rebecka
import { swithBetweenMode, checkForToggle } from '../modules/gameView.mjs';

let size = 25;
let items = [];
let userColor = null;
const socket = io();

//Displays login form

//let localhost = "http://localhost:3000"
let localhost ="https://gridpainter.herokuapp.com"
displayLoginForm(socket);//Rebecka


//When game is full
socket.on("gameFull", msg => { 
    container.innerHTML = msg; 
})

//When logged in
socket.on("loggedIn", loggedInUser => {

    console.log("sent to chat: ", loggedInUser.username, loggedInUser.color);

    //stores color for individual user
    userColor = loggedInUser.color;

    //Creates container for board
    createContainer()

    //Switches between draw-free and game mode
    swithBetweenMode()

    checkForToggle()

    //Creates Chat
    chatFrontEnd(loggedInUser.username, loggedInUser.color, socket);

    //Saves painting (How is is this funciton accessed?)
    makeCards();

    //Save button for painting
    saveBtn(loggedInUser.username);

})

//when we join the app we get sent the current board
socket.on("currentBoard", board => {
    if(userColor){
    console.log(board);
    document.getElementById("board").innerHTML = "";
    let boardEL = document.getElementById("board");
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
    });}
})

//when tile changes every one gets a message "newTile"
socket.on("newTile", (update) => {
    if(userColor){
    console.log("newtile");

    //im not sure if this is requierd
    items[update.id].color = update.color;
    // console.log(update);

    //we get what tile was changed and update that tile on the front end
    document.getElementById(update.id).style.backgroundColor = update.color;
}})
socket.on("updateSave",(item)=>{
    makeCard(item,item.userCreated);
})



// when we click we get the id and the users color
let color = function (id, color) {

    // we get the tile on the frontend
    let el = document.getElementById(id);
    // console.log(el.style.backgroundColor);

    //if the current tile color dose not eaqual the user color we cange it to the usercolor
    if (el.style.backgroundColor != color) {

        // we send a mesage with what color to change
        socket.emit("updateTile", { id: id, color: color });
    }
    else {// elese we change it to white
        socket.emit("updateTile", { id: id, color: "white" });
    }
    // console.log(items);
}

let saveBtn = function(username){
   let html = `<div><button id = "saveBtn">Save</button></div>`;
    document.getElementById("board").insertAdjacentHTML('afterend',html);
    document.getElementById("saveBtn").addEventListener("click",function(){
        let msg = {username:username};
        fetch(localhost + "/paintings/savepainting", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(msg)
          }).catch(function(err) {
            console.log(err,"error");
        });
    })
}


function createContainer(){

    const container = `<div id="container">
    <div id="board"></div>
    </div>`

    document.body.insertAdjacentHTML('beforeEnd', container)
    
}
