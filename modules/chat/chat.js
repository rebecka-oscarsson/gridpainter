const socket = io()
const {userJoin, userLeave, getCurrentUser, getUsers} = require('./users.js')

socket.on('join', ({username, color})=> {
    const user = userJoin(socket.id, username, color)
    
})

