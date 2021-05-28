
//Function for signing in users

function login(users, username, socket) {
  for (user in users) {

    //if the object (that has a color) has no username
    if (!users[user].username) {

      //grab the spot
      users[user].username = username;
      users[user].socketID = socket.id;
      let loggedInUser = users[user];

      //passes on the object loggedInUser to the chat and game
      socket.emit("loggedIn", loggedInUser);
      return
    }
  }
  socket.emit("gameFull", "Sorry, game is full");
}

module.exports = login