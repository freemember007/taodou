/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , models = require('../models')
  , User = models.User
  , Goods = models.Goods
  , crypto = require('crypto');

mongoose.connect('mongodb://localhost/taodou');

/*
 * 商品路由.
 */
exports.Goods = function(req, res) {
  if (req.method == 'POST') {
    var newGoods = new Goods({
      title: req.body.title,
      url: req.body.url,
      image: req.body.image,
      mall: req.body.site,
      catelog: req.body.catelog,
      oldPrice: req.body.price,
      newPrice: req.body.newPrice
    });

    newGoods.save(function(err){
      if (err) {
        console.log(err);
        return res.json({type: 'fail', info: err.message })
      }
      return res.json({type: 'success', info: '收藏成功！' })
    })
  } else if (req.method == 'GET') {
      Goods.find({}, function(err,user){
      if (err) {
        console.log(err);
        return res.json({type: 'fail', data: err.message })
      }
      return res.json({type: 'success', data: user })
    })
  }
  

};

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
      // res.cookie('user', newUser, {path: '/', httpOnly: false});
      req.session.user = newUser;
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
  // console.log('current user: '+ req.cookies.user);
  // console.log('current user: '+ req.session.user);
  if ((!req.session.user)) {
    fs = require("fs");
    res.writeHead(200, {"Content-Type": "text/html"});
    fs.readFile('./index.html', function(err, data) {
      return res.end(data);
    });
    // res.redirect('index.html')
  } else {
    // res.redirect('mainlist.html') 
    fs = require("fs");
    res.writeHead(200, {"Content-Type": "text/html"});
    fs.readFile('./main.html', function(err, data) {
      return res.end(data);
    });
  }
	
};

