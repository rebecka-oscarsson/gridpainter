function login(users, username, socket, io) {
  for (user in users) {
    if (!users[user].username) //if the object (that has a color) has no username
    {
      users[user].username = username; //grab the spot
      console.log("colors assigned: ", users);
      loggedInUser = users[user];
      io.emit("loggedIn", loggedInUser);
      return loggedInUser;
    }
  }
  socket.emit("gameFull", "Sorry, game is full");
}

module.exports = login