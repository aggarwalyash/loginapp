var express = require('express');
var router = express.Router();

 var User = require('../models/user');

// Follow
router.get('/', function(req, res){

  // 	var MongoClient = require('mongodb').MongoClient;
  // var url = 'mongodb://localhost/EmployeeDB';
  // MongoClient.connect(url, function(err, db) {
  //     var cursor = db.collection('Employee').find();
  //     cursor.each(function(err, doc) {
  //         console.log(doc);
  //     });
  // });
  User.find({}, function(err, data){
		// console.log(">>>> " + data);
    res.render('follow',{users: data});
	});
});

function context_giver(req, res, next){
  req.success_msg1 = {success_msg: "You successfully followed"};
  return next();
}

router.get('/:username', function(req, res){
  var username = req.params.username;
  User.findUserByUsername(username, function(error, user){
    // if (error) return next(error);
    if(error){
      console.log(error);
    }
    if(user != null){
       user.followers.push(req.user._id);
       var followedUser = user._id;
      //  console.log(user._id);
      //  console.log("fs" + req.user._id);
       user.save(function(err){
         if(err){
           console.log("Will handle later");
         }
         else{
           User.findUserByUsername(req.user.username, function(error, user){
             if(error){
               console.log(error);
               req.flash('error_msg',"Seems like user does not exist!!!");
               res.redirect('/');
             }
             else{
               user.following.push(followedUser);
               user.save(function(err){
                 if(err){
                   console.log("ther is error");
                 }
                 else{
                    req.flash('success_msg',"You successfully followed "+ username);
                    res.redirect('/');
                 }
               });
              }
            });
           }
      });
    }
  });
// res.render('index',{success_msg: "You successfully followed "+ username});
});



module.exports = router;
