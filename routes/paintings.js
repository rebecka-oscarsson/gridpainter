var express = require('express');
var router = express.Router();
let rand = require("random-key-generator");

router.post('/savepainting', function(req, res, next) {
  let object = {
    paintingID: rand(8),
    userCreated: req.body.username,
    data: req.body.board
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
  req.app.locals.db.collection("paintings").find({paintingID:req.body.id}).toArray().then(function(data){
    res.send(data);
  })
});


module.exports = router;

// req.app.locals.db.collection("smari").insertOne(req.body).then(console.log("added"));
//  req.app.locals.db.collection("smari").find({userName:req.body.userName}).toArray()