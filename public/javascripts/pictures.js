//let local = "http://localhost:3000";
let local = "https://gridpainter.herokuapp.com"


let makeCards = function(){
    //document.getElementById("container").innerHTML = "";
    fetch(local+'/paintings/getallpainting')
    .then(response => response.json())
    .then(function (data) {


      //Create Archive element for saved paintings
      const element = document.getElementById("container");
      
      const saved_paintings_archive = document.createElement('div')
      const saved_paintings_archive_wrapper = document.createElement('div')
      const saved_paintings_archive_title_wrapper = document.createElement('div')
      const archive_title = document.createElement('h2')

      saved_paintings_archive.id = "saved_paintings_archive"
      saved_paintings_archive_wrapper.id = "saved_paintings_archive_wrapper"
      archive_title.innerHTML = "Archive"

      saved_paintings_archive_title_wrapper.insertAdjacentElement('beforeend', archive_title);
      saved_paintings_archive.insertAdjacentElement('beforeend', saved_paintings_archive_title_wrapper);
      saved_paintings_archive.insertAdjacentElement('beforeend', saved_paintings_archive_wrapper);
      element.insertAdjacentElement('afterend', saved_paintings_archive);


      //Get squares(cards)
      for (let i = 0; i < data.length; i++) {

        makeCard(data[i], data[i].userCreated)
      }
      
    }).catch(function(err) {
      console.log(err,"error");
  });

    //Clears current board
    makeNewCard();
} 


let makeNewCard = function(){
  let element = document.getElementById("container");
  element.insertAdjacentHTML("beforeend",
  `<div class="card">
  <h1>New Board</h1>
  <button id="newButton">Click me</button>
  </div>`);   
  document.getElementById("newButton").addEventListener("click",()=>{
    fetch(local+"/paintings/newpainting").then().catch(function(err) {
      console.log(err,"error");
  });;
      
  });

}

let makeCard = function(item,name){

  let element = document.getElementById("saved_paintings_archive_wrapper");
  let id = item.paintingID;

  element.insertAdjacentHTML("beforeend", `<div class="card">
  <p>created by: ${name}</p>
  <p>id:${item.paintingID}</p>
  <button id="${item.paintingID}">Click me</button>
  </div>`);

  document.getElementById(item.paintingID).addEventListener("click", () => {
    loadBoard(id);
  });
}

/*function getPicture(tiles){
    let picture = `<div id="picture">`
    console.log(tiles[1]);
    for (let i = 0; i < tiles.length; i++) {
        picture += `<div style = "background-color:${tiles[i].color}; width:25px; height:25px"></div>`
    }
    picture += "</div>"
    return picture
}*/

function loadBoard(id){
  console.log(id, "loadboard");
  let msg = {idValue:id};
  fetch(local+"/paintings/getonepainting", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(msg)
    }).then((err)=>{
      if(err){console.log(err);}
      console.log("lol");}).catch(function(err) {
        console.log(err,"error");
    });
}
