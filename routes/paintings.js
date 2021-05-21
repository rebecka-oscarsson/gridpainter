var express = require('express');
var router = express.Router();
let rand = require("random-key-generator");

router.get('/savepainting', function(req, res, next) {
  let object = {
    paintingID: rand(8),
    userCreated: "smari",//req.body.username,
    data: req.app.locals.stuff//req.body.board
  }
  req.app.locals.db.collection("paintings").insertOne(object).then(console.log("added"));
});

router.get("/getallpainting", function(req, res, next){
  req.app.locals.db.collection("paintings").find().toArray()
  .then(resaults => {
    console.log(resaults);
    res.send(resaults);
    return
  }) 
});

router.get("/getonepainting", function(req, res, next){
  req.app.locals.db.collection("paintings").find({paintingID:req.body.idValue}).toArray().then(function(obj){
    req.app.locals.stuff = obj.data;
    
  })
});


module.exports = router;

// req.app.locals.db.collection("smari").insertOne(req.body).then(console.log("added"));
//  req.app.locals.db.collection("smari").find({userName:req.body.userName}).toArray()