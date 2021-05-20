export { chatFrontEnd }
const socket = io()


function chatFrontEnd(username, color) {

    const input = document.getElementById('chatInput')
    const inputBtn = document.getElementById('inputBtn')


    // Message submit
    inputBtn.addEventListener('click', function () {

        socket.emit('chatMessage', input.value)
    })


    // Join chatroom

    socket.emit('join', { username, color })

    console.log(username, color)


    console.log(username, color)


    //Recives message from server
    socket.on("message", function (msg, user) {
        console.log(msg, user);
    })
    


}




// export const join = (username, color) => {

//     const input = document.getElementById('chatInput')
//     const inputBtn = document.getElementById('inputBtn')

//     // Join chatroom
//     socket.emit('join', { username, color })

//     console.log(username, color)


//     // Message submit
//     inputBtn.addEventListener('click', function () {

//         socket.emit('chatMessage', input.value)

//     })

//     //skickar meddelande till servern


//     // // ta emot meddelande från servern
//     socket.on("message", function (msg, user) {
//         console.log(msg, user);
//     })
// }






