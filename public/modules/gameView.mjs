







//Game mode view

function gameModeView(){

    const header_section = document.getElementById('header_section')

    //Changing title
    document.getElementById("game_mode_title").innerText = "GAME MODE";
    
    //Changing backgroudn color
    document.body.style.backgroundColor = "red";

    //Crete element for facit drawing
    // const drawing_answer  = document.createElement('div')

    // //Set id
    // drawing_answer.id = "drawing_answer"

    // header_section.insertAdjacentElement("afterend", drawing_answer)
 

   

    
}


export function checkForToggle(){

    // Create elements
    const header_section = document.getElementById('header_section')
    const game_mode_title = document.createElement('p')
    
    //Set id
    game_mode_title.id = "game_mode_title"

    header_section.insertAdjacentElement("beforeend", game_mode_title)

    const toggle = document.getElementById("myToggle")

    toggle.addEventListener('click', () => {
        
        console.log(toggle.checked )

        console.log("gee")
    
        if(toggle.checked){

            console.log("gee11")

            //Activate game view
            gameModeView()
        } else {

            //Change title name
            document.getElementById("game_mode_title").innerText = "Draw Mode"
            // document.getElementById('drawing_answer').remove()
            document.body.style.backgroundColor = "";
            

            // Draw mode
        }

    })
}


export function swithBetweenMode(){

    const login_title = document.getElementById('login_title')

    const swithBtn = `
    
    <p> Free Draw or Game mode</p>
    <label class="toggle" for="myToggle">
    <input class="toggle__input" name="" type="checkbox" id="myToggle">
    <div class="toggle__fill"></div>
    </label>
    `

    login_title.insertAdjacentHTML("afterend", swithBtn)

    // return swithBtn
   
}