/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , models = require('../models')
  , User = models.User
  , crypto = require('crypto');

mongoose.connect('mongodb://localhost/taodou');


/*
 * POST Register.
 */
exports.reg = function(req, res) {
	var md5 = crypto.createHash('md5');
	var password = req.body.password !== '' ? md5.update(req.body.password).digest('base64') : ''; //判断password为空的情况
	var newUser = new User({
		email: req.body.email,
    name: req.body.name,
    password: password,
  });
  User.find({email: newUser.email}, function(err,user){
  	if (user.length != 0) {
  		return res.json({type: 'fail', info: '邮箱已存在！' })
  	}
  	newUser.save(function(err){
  		if (err) {
        console.log(err);
  			return res.json({type: 'fail', info: err.message })
  		}
			return res.json({type: 'success', info: '注册成功！' })
  	})

  })
};

/*
 * POST Login.
 */
exports.login = function(req, res) {
  var md5 = crypto.createHash('md5');
  var password = req.body.password !== '' ? md5.update(req.body.password).digest('base64') : '';
  var newUser = new User({
    email: req.body.email,
    password: password
  });
  User.find({email: newUser.email}, function(err,user){
    if (user.length === 0) {
      return res.json({type: 'fail', info: '电子邮箱或密码错误！' })
    }
    if (user.password != password) {
      return res.json({type: 'fail', info: '电子邮箱或密码错误！' })
    }
    req.session.user = user;
    return res.json({type: 'success', info: '登录成功！' })

  })
};

exports.index = function(req, res) {
	res.redirect('/index.html')
};

