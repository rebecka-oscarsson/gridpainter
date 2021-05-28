



let makeCards = function() {

  fetch('http://gridpainter.herokuapp.com/paintings/getallpainting')
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


      for (let i = 0; i < data.length; i++) {

        makeCard(data[i], data[i].userCreated)
      }

    });

  makeNewCard();
}

let makeNewCard = function(){
  let element = document.getElementById("container");
  element.insertAdjacentHTML("beforeend",

  `<div class="card">
  <h1>New Board</h1>
  <button id="newButton">Click me</button>
  </div>`);

  document.getElementById("newButton").addEventListener("click", () => {
    fetch("http://gridpainter.herokuapp.com/paintings/newpainting").then((err) => {

      console.log(err);
    });

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


function loadBoard(id) {

  let msg = { idValue: id };

  fetch("http://gridpainter.herokuapp.com/paintings/getonepainting", {

    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(msg)
  }).then((err) => {

    if (err) { console.log(err); }

  })
}
