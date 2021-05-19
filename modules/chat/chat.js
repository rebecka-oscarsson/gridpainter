const {userJoin, userLeave, getCurrentUser, getUsers} = require('./users.js')
const {formatMessage} = require('./messages.js')

function chat(){


// när användare joinar, skickar in ett userobject till array i users.js
socket.on('join', ({username, color})=> {
    const user = userJoin(socket.id, username, color)

    socket.join('gridpainter')
    
})

// skicka meddelande, chattmeddelanden 
socket.on('chatMessage', (msg) => {
    const user = getCurrentUser(socket.id)
    io.to('gridpainter').emit('message', formatMessage(user.username, msg))
}) 

// skicka meddelande när ny person ansluter eller disconnectar

// skicka alla användare som är online och vilken färg dom har

}
module.exports = chat