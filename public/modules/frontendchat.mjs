
export function chatFrontEnd(username, color, socket) {
    
    chatWindow()

    const chatbox_msgInput = document.getElementById('chatbox_msgInput')
    const chatbox_sendButton = document.getElementById('chatbox_sendButton')
    const chatBtn = document.querySelector('.chatbox_button')
    const chatBoxContent = document.querySelector('.chatBoxContent')

    // Message submit
    chatbox_sendButton.addEventListener('click', function (e) {
        e.preventDefault()

        if (chatbox_msgInput.value != "") {
            socket.emit('chatMessage', chatbox_msgInput.value)

            chatbox_msgInput.value = ""
            chatbox_msgInput.focus()
        }
    })

    //show hide chat
    chatBtn.addEventListener('click', () => {
        chatBoxContent.classList.toggle('chatNotActive')
    })

    // Join chatroom
    socket.emit('join', { username, color })

    //Get users
    socket.on("users", ({ users }) => {
        outputUsers(users)
    })

    //Recives message from server
    socket.on("message", function (user, msg, isSelf) {

        if(document.querySelector(".message_item_typing")){

            //Remove typing element
            document.querySelector(".message_item_typing").remove()
        
        }
        
        outputMessage(user, msg, isSelf)
    })

     //Recives typing status from server
     socket.on("chatBubbleStatus", function (status) {
        
        console.log("testing status" + status)

        if(!document.querySelector(".message_item_typing")){

            chatTyping();

            setTimeout(function(){ 
                
                //Remove typing element
                document.querySelector(".message_item_typing").remove()
                
            }, 3000);

        }
        
    })

    // Event listener that checks if anyone is typing in chat input
    document.querySelector("#chatbox_msgInput").addEventListener('keypress', function(e){
        if(e.target.value!= ""){
            socket.emit('chatBubble')
        }
    })

}



// Add users to chat
function outputUsers(users) {

    const playerArea = document.querySelector('.playerSidebar_players')

    playerArea.innerHTML = '';
    users.forEach((user) => {

        const player_wrapper = document.createElement('div')
        const player_color = document.createElement('span')
        const li = document.createElement('li');
        li.innerText = user.username;
        player_color.style.backgroundColor = user.color
        player_wrapper.appendChild(player_color);
        player_wrapper.appendChild(li);
        playerArea.appendChild(player_wrapper);
    });
}


//Adds message to chat
function outputMessage(user, msg, isSelf) {

    const chatbox_chatmsgArea = document.getElementById('chatbox_chatmsgArea')

    //Create Elements  
    const message = document.createElement('div')
    const messages_item = document.createElement('div')
    const senderInfo = document.createElement('p')
    const userName = document.createElement('span')
    const chatMessage = document.createElement('p')

    //Set Element Structure
    message.insertAdjacentElement('beforeEnd', messages_item);
    messages_item.insertAdjacentElement('beforeEnd', senderInfo);
    senderInfo.insertAdjacentElement('beforeEnd', userName);
    messages_item.insertAdjacentElement('beforeEnd', chatMessage);

    //Set classes & id
    message.classList = "message"
    senderInfo.classList = "senderInfo"
    chatMessage.classList = "chatMessage"
    messages_item.classList = "messages_item"

    //Set inner html
    userName.innerHTML = user
    chatMessage.innerHTML = msg

    //Insert element to  body
    chatbox_chatmsgArea.insertAdjacentElement('beforeend', messages_item);

    chatbox_chatmsgArea.scrollTop = chatbox_chatmsgArea.scrollHeight

    //Check if message is from self
    if (isSelf) {
        messages_item.classList.add('message_sender')
    } else {
        messages_item.classList.add('message_reciver')
    }
    
}

function chatTyping(){

    const chatbox_chatmsgArea = document.getElementById('chatbox_chatmsgArea')

    const message_item_typing = document.createElement('div')
    const message_item_typing_dot1 = document.createElement('span')
    const message_item_typing_dot2 = document.createElement('span')
    const message_item_typing_dot3  = document.createElement('span')

    message_item_typing.classList = "message_item_typing"
    message_item_typing.insertAdjacentElement('beforeEnd', message_item_typing_dot1);
    message_item_typing.insertAdjacentElement('beforeEnd', message_item_typing_dot2);
    message_item_typing.insertAdjacentElement('beforeEnd', message_item_typing_dot3);

    chatbox_chatmsgArea.insertAdjacentElement('beforeEnd', message_item_typing );
}

export function chatWindow() {

    //Create Elements   
    const chatBox = document.createElement('section')
    const chatBox_active = document.createElement('div')
    const chatBox_contentWrapper = document.createElement('div')

    chatBox.id = "chatBox"
    chatBox_contentWrapper.classList = "chatBox_contentWrapper"
    chatBox_active.classList.add('chatBoxContent')

    //Chat Header
    const chatbox_header = document.createElement('div')
    const chatbox_header_content = document.createElement('div')
    const chatbox_header_player_color = document.createElement('span')
    const chatbox_header_title = document.createElement('h4')
    const chatbox_header_description = document.createElement('p')

    chatbox_header.classList = "chatbox_header"
    chatbox_header_player_color.classList = "chatbox_header_player_color"
    chatbox_header_title.innerHTML = "Chat"
    chatbox_header_description.innerHTML = "Take the opporunity to chat with your co-players"

    chatbox_header.insertAdjacentElement('beforeEnd', chatbox_header_player_color);
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
    const chatbox_playerSidebar_players = document.createElement('div')

    chatbox_playerSidebar.classList = "chatbox_playerSidebar"

    chatbox_playerSidebar_title.innerHTML = "Players"

    chatBox_contentWrapper.insertAdjacentElement('afterbegin', chatbox_playerSidebar);
    chatbox_playerSidebar.insertAdjacentElement('beforeEnd', chatbox_playerSidebar_title);
    chatbox_playerSidebar.insertAdjacentElement('beforeEnd', chatbox_playerSidebar_players);

    //Chat Footer Area
    const chatbox_footer = document.createElement('footer')
    const chatbox_form = document.createElement('form')
    const chatbox_msgInput = document.createElement('Input')
    const chatbox_sendButton = document.createElement('button')

    chatbox_msgInput.id = "chatbox_msgInput"
    chatbox_sendButton.id = "chatbox_sendButton"
    chatbox_msgInput.type = "text"
    chatbox_footer.classList = "chatbox_footer"
    chatbox_sendButton.type = 'submit'
    chatbox_msgInput.required = true
    chatbox_playerSidebar_players.classList = "playerSidebar_players";

    chatbox_sendButton.innerHTML = "Send"

    chatbox_form.insertAdjacentElement('beforeEnd', chatbox_msgInput);
    chatbox_form.insertAdjacentElement('beforeEnd', chatbox_sendButton);
    chatbox_footer.insertAdjacentElement('beforeEnd', chatbox_form);

    //Chat Box Button
    const chatbox_button = document.createElement('button')
    const chatbox_button_img = document.createElement('img')

    chatbox_button.insertAdjacentElement('beforeEnd', chatbox_button_img);

    chatbox_button_img.src = "./images/chatbox-icon.svg"
    chatbox_button.classList = 'chatbox_button'

    //Set Element Structure
    chatBox.insertAdjacentElement('beforeEnd', chatBox_active);
    chatBox_active.insertAdjacentElement('beforeEnd', chatbox_header);
    chatBox_active.insertAdjacentElement('beforeEnd', chatBox_contentWrapper);
    chatBox_active.insertAdjacentElement('beforeEnd', chatbox_footer);
    chatBox.insertAdjacentElement('beforeEnd', chatbox_button);

    //Insert element to  body
    document.body.insertAdjacentElement('beforeend', chatBox);
    return chatBox

}