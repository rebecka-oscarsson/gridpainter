

export { chatFrontEnd, chatWindow}
const socket = io()


function chatFrontEnd(username, color) {

    const input = document.getElementById('chatInput')
    const inputBtn = document.getElementById('inputBtn')

    // Message submit
    inputBtn.addEventListener('click', function () {

        console.log(input.value)
        socket.emit('chatMessage', input.value)
    })

    // Join chatroom
    socket.emit('join', { username, color })
    console.log(username, color)

    //Recives message from server
    socket.on("message", function (user, msg) {
        console.log(msg, user);

        outputMessage(user, msg)
    })
    

}

function outputMessage(user, msg){

const chatmsgArea = document.getElementById('chatmsgArea')

//Create Elements  
const message = document.createElement('div') 
const messageWrapper = document.createElement('div') 
const senderInfo = document.createElement('p')
const userName = document.createElement('span')
const chatMessage = document.createElement('p')

//Set Element Structure
message.insertAdjacentElement('beforeEnd', messageWrapper);
messageWrapper.insertAdjacentElement('beforeEnd', senderInfo);
senderInfo.insertAdjacentElement('beforeEnd', userName);
messageWrapper.insertAdjacentElement('beforeEnd', chatMessage);

//Set classes & id
message.classList = "message"
senderInfo.classList ="senderInfo"
chatMessage.classList ="chatMessage"
messageWrapper.classList = "messageWrapper"



//Set inner html
userName.innerHTML = user
chatMessage.innerHTML = msg


//Insert element to  body
chatmsgArea.insertAdjacentElement('beforeend', message);

}















function chatWindow(){

    //Create Elements   
    const chatArea = document.createElement('section')

    const header = document.createElement('header') //
    const chatTitle = document.createElement('h3')
    const chatContent = document.createElement('div')
    const chatSidebar = document.createElement('div')
    const chatmsgArea = document.createElement('div')
    const roomTitle = document.createElement('h3')
    const chatForm = document.createElement('div')
    const chatInput = document.createElement('Input')
    const chatBtn = document.createElement('button')

    //Set Element Structure
    chatArea.insertAdjacentElement('beforeEnd', header);
    chatArea.insertAdjacentElement('beforeEnd', chatContent);
    chatArea.insertAdjacentElement('beforeEnd', chatForm);
    header.insertAdjacentElement('beforeEnd', chatTitle);
    chatContent.insertAdjacentElement('beforeEnd', chatSidebar);
    chatSidebar.insertAdjacentElement('beforeEnd', roomTitle);
    chatContent.insertAdjacentElement('beforeEnd', chatmsgArea);
    chatForm.insertAdjacentElement('beforeEnd', chatInput);
    chatForm.insertAdjacentElement('beforeEnd', chatBtn);
    

    //Set classes & id
    chatArea.id = "chatArea"
    chatInput.id ="chatInput"
    chatBtn.id ="inputBtn"

    chatContent.classList = "chatContent"
    chatSidebar.classList = "chatSidebar"
    chatmsgArea.id = "chatmsgArea"
    chatForm.classList = "chatForm"
    chatInput.type = "text"
   
    //Set inner html
    chatTitle.innerHTML = "Chat"
    chatBtn.innerHTML = "Send"
    roomTitle.innerHTML = "Room"

    //Insert element to  body
    document.body.insertAdjacentElement('beforeend', chatArea);
    return chatArea

}