const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const board = require("./modules/board");

const app = express();
const server = http.createServer(app);
const io = socketio(server);


let items = [];
let size = 25;

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", socket => {
  if (items.length == 0) { board(items, size) } //if the board is empty we can create a new one else we dont do it so we dont overwrite the board
  console.log("connected");
  socket.emit("currentBoard", items); // this is where we send the board to a user that just connected
  socket.on("updateTile", (update) => { // when a user sends that they changed a tile
    items[update.id].color = update.color; // we update our tiles on the servers list 
    console.log(items[update.id]);
    io.emit("newTile", update);// then we tell all the other users that a tile has beeen updated
  })

});

// Creates 2nd socket connect for chat
require("./modules/chat/chat.js")(io)





const PORT = 3000 || process.env.PORT;


server.listen(PORT, () => console.log("listening on port 3000"));
