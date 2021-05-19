const socket = io()

//ny användare joinar
export const join = (username, color) => {

    socket.emit('join', { username, color })

}

//skickar meddelande till servern
socket.emit('chatMessage', msg)

// ta emot meddelande från servern
socket.on("message", function(msg){
    console.log(msg);
    // outputMessage(msg)
    // chatMessages.scrollTop = chatMessages.scrollHeight;
  
  })