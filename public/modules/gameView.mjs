







//Game mode view

function gameModeView(){

    const header_section = document.getElementById('header_section')

    //Changing title
    document.getElementById("game_mode_title").innerText = "GAME MODE";

    const color = "linear-gradient(268.91deg, #f5927c -2.14%, #45382e 99.69%)";
    
    //Changing backgroudn color
    document.body.style.background = color;
    
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
    
        if(toggle.checked){

            //Activate game view
            gameModeView()
        } else {

            const color = "linear-gradient(93.12deg, #7EF8B6 0.52%, #2E4531 100%)";
            //Change title name
            document.getElementById("game_mode_title").innerText = "Draw Mode"
            document.body.style.background = color;
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