

// Displays login form
export function displayLoginForm(element, socket) {

    
    //Create login
    const login_section = loginElements()

    //Create header
    const header_section = createHeader()

    //Append login to document
    element.insertAdjacentElement("beforeEnd", login_section);


        //Event listener for login btn
        document.getElementById("login_button").addEventListener('click', function (e) {

        e.preventDefault();
        sendUsername(socket); document.querySelector("#loginForm").innerHTML = ""

        //Append Header to document
        element.insertAdjacentElement("beforeBegin", header_section);

        document.getElementById("login_section").remove()

    });
}

// Sends the name from the login form
function sendUsername(socket) {

    let username = document.getElementById("nameField").value;

    console.log("name sent to backend: ", username)
    socket.emit("newUser", username);
}


// Create login elements 
function loginElements(){

      //Create Elements   
      const login_section = document.createElement('section')
      const login_title = document.createElement('h1')
      const login_form = document.createElement('form')
      const login_label = document.createElement('p')
      const login_input = document.createElement('input')
      const login_button = document.createElement('button')
  
      const login_img_left = document.createElement('image')
      const login_img_right = document.createElement('image')
  
      //Set Element Structure
      login_section.insertAdjacentElement("beforeEnd", login_img_left);
      login_section.insertAdjacentElement("beforeEnd", login_title);
      login_section.insertAdjacentElement("beforeEnd", login_form);
      login_form.insertAdjacentElement("beforeEnd", login_label);
      login_form.insertAdjacentElement("beforeEnd", login_input);
      login_section.insertAdjacentElement("beforeEnd", login_button);
      login_section.insertAdjacentElement("beforeEnd", login_img_right);
  
      //Set attributes
      login_form.id = "loginForm"
      login_input.id = "nameField"
      login_section.id = "login_section"
      
  
      login_input.type = "text"
      login_input.placeholder ="Player name"
  
      login_button.type = "submit"
      login_button.id = "login_button"
  
      //Set inner html
      login_title.innerHTML = "Welcome to gridpainter!"
      login_label.innerHTML = "Enter your nickname"
      login_button.innerHTML = "log in"
  
      //Login images
      login_img_left.id = "login_img_left"
      login_img_right.id = "login_img_right"

    return login_section
}

function createHeader(){

    //Create Elements   
    const header_section = document.createElement('header')
    const login_title = document.createElement('h1')

    //Set Element Structure
    header_section.insertAdjacentElement("beforeEnd", login_title);

    login_title.id = "login_title"
    header_section.id = "header_section"

    login_title.innerHTML = "Welcome to gridpainter!"

  return header_section
}