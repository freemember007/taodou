var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Define User schema
var _User = new Schema({
	email: {type:String, index: true, required: true, unique:true},
	name: {type:String, index:true, required: true, unique:true},
	avatar: String,
	password: {type:String, required: true}
});

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

// Define Deal schema
var _Deal = new Schema({
	title: {type:String, index: true, required: true, unique:true},
	alink: String,
	blink: String,
	simage: String,
	mimage: String,
	content: String,
	mall: String,
	catelog: String,
	brand: String,
	pname: String,
	model: String,
	currency: String,
	price: String,
	promote: String,
	source: String
});

// export them
exports.User = mongoose.model('User', _User);
exports.Goods = mongoose.model('Goods', _Goods);
exports.Deal = mongoose.model('Deal', _Deal);

