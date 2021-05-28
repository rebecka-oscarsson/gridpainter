const path = require("path");
const http = require("http");
const express = require("express");
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const socketio = require("socket.io");
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');

let paintingRoute = require("./routes/paintings");
const board = require("./modules/board");
const login = require("./modules/login");//Rebecka
const { userJoin, userLeave, getCurrentUser, getUsers } = require('./modules/chat/users.js');
const { setTimeout } = require("timers");


const app = express();
const server = http.createServer(app);
const io = socketio(server);


let items = [];

let uri = "mongodb+srv://admin:admin@cluster0.fpfbz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


//db connection 
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  if(err){
    console.log(err);
  }  
  const collection = client.db("paintings");
  app.locals.db = collection;
});

app.use(express.static(path.join(__dirname, "public")));
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/paintings', paintingRoute);




let size = 225;
app.locals.stuff = items;
let users = [{username: null, color:"firebrick", socketID: null}, {username: null, color:"darkolivegreen", socketID: null}, {username: null, color:"gold", socketID: null}, {username: null, color:"cornflowerblue", socketID: null}]
app.locals.allPaintings = [];

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", socket => {

  if(items.length == 0){board(items, size)} //if the board is empty we can create a new one else we dont do it so we dont overwrite the board
  console.log("connected");
  socket.on("newUser", (username) => {login(users, username, socket, io)
    socket.emit("currentBoard", app.locals.stuff);// this is where we send the board to a user that just connected
  });//(Rebecka) The login function adds username and socket id to an object in users-array
  
  socket.on("updateTile", (update) =>{ // when a user sends that they changed a tile
    items[update.id].color = update.color; // we update our tiles on the servers list 
    console.log(items[update.id]);
    io.emit("newTile", update);// then we tell all the other users that a tile has beeen updated
  })

  
  app.locals.getBoard = function(){
    //setTimeout(function(){console.log("hello world");  }, 3000);
    io.emit("currentBoard", app.locals.stuff);// this is where we send the board to a user that just connected
  }

  socket.on("disconnect", () => {
    let disconnectedUser = users.find(userObject => userObject.socketID === socket.id);
    if(disconnectedUser)
    {console.log(disconnectedUser.username, "with color", disconnectedUser.color, "disconnected");
    disconnectedUser.username = null;//removes username and id so the color is now free for grabbing
    disconnectedUser.socketID = null;}
})
  app.locals.updateSave = function(item){
    io.emit("updateSave",item);
  }
});

// Creates 2nd socket connect for chat
require("./modules/chat/chat.js")(io)

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`listening on port ${PORT}`));