
//Function for signing in users

function login(users, username, socket, io) {
  for (user in users) {

    //if the object (that has a color) has no username
    if (!users[user].username) {

      //grab the spot
      users[user].username = username;
      users[user].socketID = socket.id

      console.log("colors assigned: ", users);
<<<<<<< HEAD
      let loggedInUser = users[user];

      //used for passing on all logged in users to the chat
      socket.emit("loggedIn", loggedInUser);

      //used for storing usercolor in frontend
      socket.emit("userColor", users[user].color);

      //?
=======
      loggedInUser = users[user];
      socket.emit("loggedIn", loggedInUser);//used for passing on all logged in users to the chat
>>>>>>> 2036e5e31be4432acc17e8dcc05337025b38ec82
      return
    }
  }
  socket.emit("gameFull", "Sorry, game is full");
}

module.exports = login