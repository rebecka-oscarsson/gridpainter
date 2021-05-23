const users = [
//     {id: '12312',
//     username: 'björn',
//     color: 'green'
// }
];


function userJoin (id, username, color) {
    
    
    const user = {id, username, color};
    
    users.push(user)
       
    return user;
}

function getCurrentUser (id) {
    return users.find(user => user.id == id)
}

function userLeave (id){
    const index = users.findIndex(user => user.id == id)

    if(index!== -1){
        return users.splice(index, 1)[0];
    }
}

function getUsers(){

    console.log("getting user" + users.map(user => user.username))
    return users.map(user => user.username)
}

module.exports = {
    userJoin,
    userLeave,
    getCurrentUser,
    getUsers
}

