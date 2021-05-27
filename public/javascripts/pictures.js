
let makeCards = function(){
    //document.getElementById("container").innerHTML = "";
    fetch('http://gridpainter.herokuapp.com/getallpainting')
    .then(response => response.json())
    .then(function(data){
      for (let i = 0; i < data.length; i++) {
        makeCard(data[i], data[i].userCreated)       
      }
      
    });
    makeNewCard();
} 
let makeNewCard = function(){
  let element = document.getElementById("container");
  element.insertAdjacentHTML("beforeend",`<div class="card">
  <h1>New Board</h1>
  <button id="newButton">Click me</button>
  </div>`);   
  document.getElementById("newButton").addEventListener("click",()=>{
    fetch("http://gridpainter.herokuapp.com/newpainting").then((err)=>{console.log(err);});
      
  });
  
}

let makeCard = function(item,name){
    let element = document.getElementById("container");
    let id = item.paintingID;
    element.insertAdjacentHTML("beforeend",`<div class="card">
    <p>created by: ${name}</p>
    <p>id:${item.paintingID}</p>
    <button id="${item.paintingID}">Click me</button>
    </div>`);   
    document.getElementById(item.paintingID).addEventListener("click",()=>{loadBoard(id);});
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
  fetch("http://gridpainter.herokuapp.com/paintings/getonepainting", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(msg)
    }).then((err)=>{
      if(err){console.log(err);}
      console.log("lol");})
}
