


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
    element.insertAdjacentHTML("beforeend",`<div class="card">
    ${getPicture(item.data)}
    <p>created by: ${name}</p>
    <p>id:${item.paintingID}</p>
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


