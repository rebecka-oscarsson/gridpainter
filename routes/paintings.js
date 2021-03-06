var express = require('express');
var router = express.Router();
let rand = require("random-key-generator");
const board = require("../modules/board");
let pictures = [];
//let local = "http://localhost:3000";
let local = "https://gridpainter.herokuapp.com"

router.post('/savepainting', function (req, res, next) {
  let object = {
    paintingID: rand(8),
    userCreated: req.body.username,
    data: req.app.locals.stuff//req.body.board
  }
  req.app.locals.db.collection("paintings").insertOne(object).then(()=>{
    req.app.locals.allPaintings.push(object);
    req.app.locals.updateSave(object);
  });
});



router.get("/getallpainting", function (req, res, next) {
  req.app.locals.db.collection("paintings").find().toArray()
    .then(resaults => {
      req.app.locals.allPaintings = resaults;
      res.send(resaults);
    })
});

router.post("/getonepainting", function(req, res, next){
    req.setTimeout(1) // no timeout
    id = req.body.idValue;
    let arr = req.app.locals.allPaintings
    for (let i = 0; i < arr.length; i++) {
      if(arr[i].paintingID == id){
        req.app.locals.stuff = arr[i].data;
        req.app.locals.getBoard();
      }
    }
});

router.get("/newpainting", function (req, res, next) {
  newBoard = [];
  board(newBoard, 225);
  req.app.locals.stuff = newBoard;
  req.app.locals.getBoard();
})


module.exports = router;
