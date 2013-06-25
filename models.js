var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Define User schema
var _User = new Schema({
	email: {type:String, index: true, required: true, unique:true},
	name: {type:String, index:true, required: true, unique:true},
	avatar: String,
	password: {type:String, required: true}
});

// export them
exports.User = mongoose.model('User', _User);


// Define Goods schema
var _Goods = new Schema({
	title: {type:String, index: true, required: true},
	url: {type:String, index:true},
	image: String,
	mall: String,
	catelog: String,
	oldPrice: String,
	newPrice: String
});

// export them
exports.Goods = mongoose.model('Goods', _Goods);