


export { chatFrontEnd, chatWindow}
const socket = io()


function chatFrontEnd(username, color) {

    const chatbox_msgInput = document.getElementById('chatbox_msgInput')
    const chatbox_sendButton = document.getElementById('chatbox_sendButton')

    // Message submit
    chatbox_sendButton.addEventListener('click', function () {

        console.log(chatbox_msgInput.value)
        socket.emit('chatMessage', chatbox_msgInput.value)
    })

    // Join chatroom
    socket.emit('join', { username, color })
    console.log(username, color)


    //Get users
    socket.on("users",({users}) =>  {
       
        // outputUsers(users);
        
        console.log("USER" + users);
        outputUsers(users) 
    })

    //Recives message from server
    socket.on("message", function (user, msg) {
        console.log(msg, user);
        outputMessage(user, msg)
    })
    
}

// Add users to chat
function outputUsers(users) {

    console.log("heehhe")

    const chatmsgArea = document.getElementById('chatSidebar')

    chatmsgArea.insertAdjacentElement('beforeEnd', users);
    // userList.innerHTML = '';
    // users.forEach((user) => {
    //   const li = document.createElement('li');
    //   li.innerText = user.username;
    //   userList.appendChild(li);
    // });
  }



//Adds message to chat
function outputMessage(user, msg){

const chatbox_chatmsgArea = document.getElementById('chatbox_chatmsgArea')

//Create Elements  
const message = document.createElement('div') 
const messages__item = document.createElement('div') 
const senderInfo = document.createElement('p')
const userName = document.createElement('span')
const chatMessage = document.createElement('p')

//Set Element Structure
message.insertAdjacentElement('beforeEnd', messages__item);
messages__item.insertAdjacentElement('beforeEnd', senderInfo);
senderInfo.insertAdjacentElement('beforeEnd', userName);
messages__item.insertAdjacentElement('beforeEnd', chatMessage);

//Set classes & id
message.classList = "message"
senderInfo.classList ="senderInfo"
chatMessage.classList ="chatMessage"
messages__item.classList = "messages__item"

//Set inner html
userName.innerHTML = user
chatMessage.innerHTML = msg

console.log(msg)

//Insert element to  body
chatbox_chatmsgArea.insertAdjacentElement('beforeend', messages__item);

}


function chatWindow(){

    //Create Elements   
    const chatBox = document.createElement('section')
    const chatBox_active = document.createElement('div')
    const chatBox_contentWrapper = document.createElement('div')

    chatBox.id = "chatBox"
    chatBox_contentWrapper.classList = "chatBox_contentWrapper"

    //Chat Header
    const chatbox_header = document.createElement('div') 
    const chatbox_header_content = document.createElement('div') 
    const chatbox_header_title = document.createElement('h4')
    const chatbox_header_description = document.createElement('p')

    chatbox_header.classList ="chatbox_header"
    chatbox_header_title.innerHTML = "Chat"
    chatbox_header_description.innerHTML = "Take the opporunity to chat with your co player"

    chatbox_header.insertAdjacentElement('beforeEnd', chatbox_header_content);
    chatbox_header_content.insertAdjacentElement('beforeEnd', chatbox_header_title);
    chatbox_header_content.insertAdjacentElement('beforeEnd', chatbox_header_description);

    //Chat message Area
    const chatbox_chatmsgArea = document.createElement('div')

    chatbox_chatmsgArea.id = "chatbox_chatmsgArea"

    chatBox_contentWrapper.insertAdjacentElement('afterbegin', chatbox_chatmsgArea);

    //Chat Player Area
    const chatbox_playerSidebar = document.createElement('div')
    const chatbox_playerSidebar_title = document.createElement('h3')

    chatbox_playerSidebar.classList = "chatbox_playerSidebar"

    chatbox_playerSidebar_title.innerHTML = "Players"

    chatBox_contentWrapper.insertAdjacentElement('afterbegin', chatbox_playerSidebar);
    chatbox_playerSidebar.insertAdjacentElement('beforeEnd', chatbox_playerSidebar_title );

    //Chat Footer Area
    const chatbox_footer = document.createElement('footer')
    const chatbox_msgInput = document.createElement('Input')
    const chatbox_sendButton = document.createElement('button')

    chatbox_msgInput.id ="chatbox_msgInput"
    chatbox_sendButton.id ="chatbox_sendButton"
    chatbox_msgInput.type = "text"
    chatbox_footer.classList = "chatbox_footer"

    chatbox_sendButton.innerHTML = "Send"

    chatbox_footer.insertAdjacentElement('beforeEnd', chatbox_msgInput);
    chatbox_footer.insertAdjacentElement('beforeEnd', chatbox_sendButton );

    //Chat Box Button
    const chatbox_button = document.createElement('button')
    const chatbox_button_img = document.createElement('img')
    
    chatbox_button.insertAdjacentElement('beforeEnd', chatbox_button_img);

    chatbox_button_img.src="./images/chatbox-icon.svg"
    chatbox_button.classList = 'chatbox_button'

    //Set Element Structure
    chatBox.insertAdjacentElement('beforeEnd', chatBox_active);
    chatBox_active.insertAdjacentElement('beforeEnd', chatbox_header);
    chatBox_active.insertAdjacentElement('beforeEnd', chatBox_contentWrapper);
    chatBox_active.insertAdjacentElement('beforeEnd', chatbox_footer);
    chatBox_active.insertAdjacentElement('beforeEnd', chatbox_button);

    //Insert element to  body
    document.body.insertAdjacentElement('beforeend', chatBox);
    return chatBox

}