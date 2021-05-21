
let makeCards = function(){
    fetch('http://localhost:3000/paintings/getallpainting')
    .then(response => response.json())
    .then(function(data){
      for (let i = 0; i < data.length; i++) {
        makeCard(data[i], data[i].userCreated)       
      }
    
    });
} 

let makeCard = function(item,name){
    let element = document.getElementById("container2");
    console.log(item.paintingID);
    element.insertAdjacentHTML("beforeend",`<div class="card">
    ${getPicture(item.data)}
    <p>created by: ${name}</p>
    <p>id:${item.paintingID}</p>
    <button onclick="loadBoard("${item.paintingID}")">Click me</button>
    </div>`);   

}

function getPicture(tiles){
    let picture = `<div id="picture">`
    console.log(tiles[1]);
    for (let i = 0; i < tiles.length; i++) {
        picture += `<div style = "background-color:${tiles[i].color}; width:25px; height:25px"></div>`
    }
    picture += "</div>"
    return picture
}

function loadBoard(id){
  console.log(id, "loadboard");
  let msg = {idValue:id};
  fetch("http://localhost:3000/paintings/getonepainting", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(msg)
    }).then(()=>{socket.emit("getBoard")})
}
