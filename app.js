const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const board = require("./modules/board");
const login = require("./modules/login");//Rebecka
const { userJoin, userLeave, getCurrentUser, getUsers } = require('./modules/chat/users.js')


const app = express();
const server = http.createServer(app);
const io = socketio(server);


let items = [];
let size = 25;


let users = [{username: null, color:"firebrick", socketID: null}, {username: null, color:"darkolivegreen", socketID: null}, {username: null, color:"gold", socketID: null}, {username: null, color:"cornflowerblue", socketID: null}]
let currentUserColor = null;
//Rebecka


app.use(express.static(path.join(__dirname, "public")));

io.on("connection", socket => {
  
  if(items.length == 0){board(items, size)} //if the board is empty we can create a new one else we dont do it so we dont overwrite the board
  console.log("connected");
  socket.on("newUser", (username) => {let loggedInUser = login(users, username, socket, io, socket.id);  if(loggedInUser) {currentUserColor = loggedInUser.color};});//(Rebecka) the login-function returns an object with name and color or undefined if game is full
  socket.emit("currentBoard", items);// this is where we send the board to a user that just connected
  socket.on("updateTile", (update) =>{ // when a user sends that they changed a tile
    items[update.id].color = update.color; // we update our tiles on the servers list 
    console.log(items[update.id]);
    io.emit("newTile", update);// then we tell all the other users that a tile has beeen updated
  })
  socket.on("disconnect", () => {
    let disconnectedUser = users.find(userObject => userObject.socketID === socket.id);
    disconnectedUser.username = null;
    disconnectedUser.socketID = null;
    console.log("users after disconnect", users)
    // if (currentUserColor)
  //   {console.log("färg ", currentUserColor);let disconnectedUser = users.find(userObject => userObject.color === currentUserColor);//(Rebecka) finds the disconnected user in the array
  //   console.log(disconnectedUser.username, "with color", disconnectedUser.color, "disconnected");
  //   disconnectedUser.username = null;
  // console.log("users after disconnect", users)}//removes username so the color is now free for grabbing
    //disconnectedUser should be sent to the frontend here for displaying
})
});

// Creates 2nd socket connect for chat
require("./modules/chat/chat.js")(io)

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => console.log(`listening on port ${PORT}`));
