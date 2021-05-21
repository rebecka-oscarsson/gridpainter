export { chatFrontEnd, chatWindow}
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

    //Recives message from server
    socket.on("message", function (msg, user) {
        console.log(msg, user);

        //meddlande(msg, user)
    })
    


}

function outputMessage(msg, user){

//div 
//span - user
//span med datum
//p - msg 

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
    chatContent.classList = "chatContent"
    chatSidebar.classList = "chatSidebar"
    chatmsgArea .classList = "chatmsgArea"
    chatForm.classList = "chatForm"
    chatTitle.innerHTML = "Chat"
    chatInput.type = "text"

    //Set inner html
    chatBtn.innerHTML = "Send"
    roomTitle.innerHTML = "Room"

    //Insert element to  body
    document.body.insertAdjacentElement('afterend', chatArea);
    return contentArea

}



