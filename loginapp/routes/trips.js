var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.get('/create', function(req, res){
	res.render('tripcreate');
});

router.get('/profile', function(req, res){
	res.render('myprofile');
});

router.get('/join', function(req, res){

// 	var MongoClient = require('mongodb').MongoClient;
// var url = 'mongodb://localhost/EmployeeDB';
//
// MongoClient.connect(url, function(err, db) {
//
//     var cursor = db.collection('Employee').find();
//
//     cursor.each(function(err, doc) {
//
//         console.log(doc);
//
//     });
// });
	res.render('tripjoin');
});

router.get('/past', function(req, res){
	res.render('trippast');
});

router.post('/create', function(req, res) {
	var name = req.body.name;
	var counter = req.body.counter;
	var members = [];
	console.log(counter);
	console.log(name);
	// console.log(typeof(counter));
	// console.log(typeof(req.body.counter));
  for (var j=0; j<counter; j++ ){
		var temp = String(j+1);
		console.log("temp: " + temp)
		// var x = req.body.temp;
		var x = req.body[temp];
		// console.log(x);
		members.push(x);
	}
	console.log(members);
});


module.exports = router;
