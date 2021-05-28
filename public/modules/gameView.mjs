


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