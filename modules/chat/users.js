
//Holds user objects
const users = [];

//User Join
function userJoin (id, username, color) {
    
    const user = {id, username, color};
    
    users.push(user)
       
    return user;
}

//Get current user
function getCurrentUser (id) {
    return users.find(user => user.id == id)
}

//Find user
function userLeave (id){
    const index = users.findIndex(user => user.id == id)

    if(index!== -1){
        return users.splice(index, 1)[0];
    }
}

//Get all users
function getUsers(){
    return users.map(user => user)
}


module.exports = {
    userJoin,
    userLeave,
    getCurrentUser,
    getUsers
}

