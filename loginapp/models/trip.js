var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

mongoose.connect('mongodb://localhost/loginapp');
var db = mongoose.connection;

var User = require('./user');

var TripSchema = mongoose.Schema({
  created_by: {
		type: Number,
    ref: 'User'
	},
  trip_name: {
    type: String
  },
  trip_description: {
    type: String
  },
  status: {
    type: String
  },
  members: [{ type: Number, ref: 'User'}]
});

var Trip = module.exports = mongoose.model('Trip', TripSchema);
