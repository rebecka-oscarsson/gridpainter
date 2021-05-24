const { userJoin, userLeave, getCurrentUser, getUsers } = require('./users.js')
const socket = require("socket.io");

const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const room = "gridpainter"
const serverName = 'Grid Painter';


function chat(io) {
    io.on('connection', function (socket) {

        console.log("hasda" + getUsers()) 

        // när användare joinar, skickar in ett userobject till array i users.js
        socket.on('join', ({ username, color }) => {
            const user = userJoin(socket.id, username, color)

    
            socket.join(room)

            // Welcome current user
            // socket.emit('message', `${user.username} 'Welcome to Gridpainter!`, serverName );

            // Broadcast when a user connects
            socket.broadcast
                .to(room)
                .emit('message', serverName, `${user.username} has joined the chat` )


             // Send users
            io.to(room).emit('users', {
                users: getUsers()
            });

                
        })

        // skicka meddelande, chattmeddelanden 
        socket.on('chatMessage', (msg) => {

            const user = getCurrentUser(socket.id)
            console.log("chat.js" + socket.id)
            const isSelf = 
            socket.emit('message', user.username, msg, true)
            socket.broadcast.to(room).emit('message', user.username, msg, false)

        })


        // Disconnect (When user leaves)
        socket.on('disconnect', () => {
            const user = userLeave(socket.id);

            if (user) {
                io.to(room).emit(
                    'message',  serverName, `${user.username} has left the chat` );

                // Send users and room info
                io.to(room).emit('roomUsers', {
                    users: getUsers()
                });
            }
        });

    });

};


module.exports = chat





