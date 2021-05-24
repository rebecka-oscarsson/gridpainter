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


const app = express();
const server = http.createServer(app);
const io = socketio(server);


let items = [];
let size = 25;
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
//----------------

app.locals.stuff = items

let users = [{username: null, color:"firebrick"}, {username: null, color:"darkolivegreen"}, {username: null, color:"gold"}, {username: null, color:"cornflowerblue"}]
//Rebecka


app.use(express.static(path.join(__dirname, "public")));
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/paintings', paintingRoute);


io.on("connection", socket => {
  //if(items.length == 0){board(items, size)} //if the board is empty we can create a new one else we dont do it so we dont overwrite the board
  console.log("connected");
  socket.on("newUser", (username) => {io.emit("loggedIn", login(users, username))});//Rebecka, the login-function returns an object with name and color or null (game full)
 
  socket.on("getBoard",()=>{ })// this is where we send the board to a user that just connected})
 
  socket.on("updateTile", (update) =>{ // when a user sends that they changed a tile
    app.locals.stuff[update.id].color = update.color; // we update our tiles on the servers list 
    console.log(items[update.id]);
    io.emit("newTile", update);// then we tell all the other users that a tile has beeen updated
    console.log(items);
  })

  app.locals.setBoard = function(){
    console.log("setting board");
    socket.emit("currentBoard", app.locals.stuff);

  }

});

const PORT = 3000 || process.env.PORT;


server.listen(PORT, () => console.log("listening on port 3000"));


