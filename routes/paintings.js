var express = require('express');
var router = express.Router();
let rand = require("random-key-generator");
const board = require("../modules/board");
let pictures = [];
let local = "http://localhost:3000/";


router.post('/savepainting', function(req, res, next) {
  let object = {
    paintingID: rand(8),
    userCreated: req.body.username,
    data: req.app.locals.stuff//req.body.board
  }
  req.app.locals.db.collection("paintings").insertOne(object).then(()=>{
    console.log("added");
    req.app.locals.allPaintings.push(object);
    req.app.locals.updateSave(object);
  });
});



router.get("/getallpainting", function(req, res, next){
  req.app.locals.db.collection("paintings").find().toArray()
  .then(resaults => {
    console.log(resaults);
    req.app.locals.allPaintings = resaults;
    res.send(resaults);
  }) 
});

router.post("/getonepainting", function(req, res, next){
    req.setTimeout(1) // no timeout
    id = req.body.idValue;
    let arr = req.app.locals.allPaintings
    console.log( req.app.locals.allPaintings, "getonepainting 123123");
    for (let i = 0; i < arr.length; i++) {
      if(arr[i].paintingID == id){
        req.app.locals.stuff = arr[i].data;
        console.log(arr[i].data);
        req.app.locals.getBoard();
      }
    }

  /*req.app.locals.db.collection("paintings").find({paintingID:req.body.idValue}).toArray().then(function(obj){
    //console.log(obj,"samalamastama");
    req.app.locals.stuff = obj[0].data;
   // console.log(req.app.locals.stuff,"board");
    req.app.locals.getBoard();
  })*/
});

router.get("/newpainting", function(req, res, next){
  newBoard = [];
  board(newBoard,225);
  req.app.locals.stuff = newBoard;
  req.app.locals.getBoard();
})


module.exports = router;

// req.app.locals.db.collection("smari").insertOne(req.body).then(console.log("added"));
//  req.app.locals.db.collection("smari").find({userName:req.body.userName}).toArray()