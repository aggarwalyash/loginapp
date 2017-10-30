var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var uniqueValidator = require('mongoose-unique-validator');

mongoose.connect('mongodb://localhost/loginapp');

var db = mongoose.connection;

var Trip = require('./trip');

//User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index: true,
		unique: true
	},
	password: {
		type: String
	},
	email: {
		type: String,
		unique: true
	},
	name: {
		type: String
	},
	following: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
	followers: [{type: mongoose.Schema. ObjectId, ref: 'User'}],
	trips_joined: [{ type: Number, ref: 'Trip'}]
});
UserSchema.plugin(uniqueValidator);

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	 	bcrypt.hash(newUser.password, salt, function(err, hash) {
	 		newUser.password = hash;
	 		newUser.save(callback);
		});
	});
}


module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}

module.exports.findUserByUsername = function (username, callback) {
  // Perform database query that calls callback when it's done
	var query = {username: username};
	User.findOne(query,function(err,user){
						// console.log(obj);
						if(err){
							callback(err, null);
						}
						else{
							callback(null, user);
						}
					});
  // return callback(null, user);
};



//
// module.exports.updateFollow = function (id1, id2, callback) {
// 	var data = String(id2);
// 	// find by some conditions and update
// 	// User.findOneAndUpdate(
// 	//     {_id: id},
// 	//     {$push: query},
// 	//     {safe: true, upsert: true},
// 	//     callback(null,User)
// 	// 	);
// 		User.findByIdAndUpdate(id1, {
// 			// following: [{userId: String}]
//   		$push: { following: {userId: data} }
// 		}, { safe: true,new: true,upsert: true }, callback()
// 		);
//
// };



// module.exports.getUsers = function({}, callback){
// 	    //  var u = db.collection('Employee').find();
// 			 var data = db.collection('User').find();
// 			 console.log("Quering the database" + data);
// 			 callback(data);
// }
