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

        // när användare joinar, skickar in ett userobject till array i users.js
        socket.on('join', ({ username, color }) => {
            const user = userJoin(socket.id, username, color)

            socket.join(room)

            // Welcome current user
            // socket.emit('message', `${user.username} 'Welcome to Gridpainter!`, serverName );

            // Broadcast when a user connects
            socket.broadcast
                .to(user.room)
                .emit('message', `${user.username} has joined the chat`, serverName )
                
        })

        // skicka meddelande, chattmeddelanden 
        socket.on('chatMessage', (msg) => {

            const user = getCurrentUser(socket.id)

            io.to(room).emit('message', user.username, msg)

        })

        console.log("Chat socket Connect")


        // Disconnect (When user leaves)
        socket.on('disconnect', () => {
            const user = userLeave(socket.id);

            if (user) {
                io.to(room).emit(
                    'message', `${user.username} has left the chat`, serverName);

                // Send users and room info
                io.to(room).emit('roomUsers', {
                    users: getUsers()
                });
            }
        });

    });

};


module.exports = chat





