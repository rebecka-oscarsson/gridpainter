const { userJoin, userLeave, getCurrentUser, getUsers } = require('./users.js')
const socket = require("socket.io");


const room = "gridpainter"
const serverName = 'Grid Painter';


// Socket cononection for chat
function chat(io) {
    io.on('connection', function (socket) {

        // User Joins
        socket.on('join', ({ username, color }) => {
            const user = userJoin(socket.id, username, color)

            socket.join(room);

            // Broadcast when a user connects
            socket.broadcast
                .to(room)
                .emit('message', serverName, `${user.username} has joined the chat`)


            // Send users
            io.to(room).emit('users', {
                users: getUsers()
            });


        })

        // Chat message
        socket.on('chatMessage', (msg) => {

            const user = getCurrentUser(socket.id)
            socket.emit('message', user.username, msg, true)
            socket.broadcast.to(room).emit('message', user.username, msg, false)

        })

        //Chatbubble
        socket.on('chatBubble', () => {
            socket.broadcast.to(room).emit('chatBubbleStatus', true)
        })


        // Disconnect (When user leaves)
        socket.on('disconnect', () => {
            const user = userLeave(socket.id);

            if (user) {
                io.to(room).emit(
                    'message', serverName, `${user.username} has left the chat`);

                // Send users and room info
                io.to(room).emit('roomUsers', {
                    users: getUsers()
                });
            }
        });

    });

};


module.exports = chat





