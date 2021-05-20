function assignColor(users, username) {
  for (user in users) {
    if (!users[user].username) //if the object (that has a color) has no username
    {
      users[user].username = username; //grab the spot
      console.log("colors assigned: ", users);
      return users[user];
    }
  }
  return null
}

module.exports = assignColor