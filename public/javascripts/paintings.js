


let makeCards = function(){
    fetch('http://localhost:3000/paintings/getallpainting')
    .then(response => response.json())
    .then(function(data){
      for (let i = 0; i < data.length; i++) {
        makeCard(data[i])       
      }
    
    });
} 

let makeCard = function(item){
    let element = document.getElementById("container2");
    element.insertAdjacentHTML("beforeend",`<div id="card">
    ${getPicture(item.data)}
    <p>id:${item.paintingID}</p>
    </div>`);   

}

function getPicture(tiles){
    let picture = `<div id="picture">`
    console.log(tiles[1]);
    for (let i = 0; i < tiles.length; i++) {
        picture += `<div style="background-color="${tiles.color}"; width="5px"; height="5px"></div>`
    }
    picture += "</div>"
    return picture
}


