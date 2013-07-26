/**
 * 模块依赖.
 */
var mongoose = require('mongoose')
	, models = require('../models')
	, User = models.User
	, Goods = models.Goods
	, Deal = models.Deal
	, crypto = require('crypto')
	, fetch = require('../fetchOne.js');

mongoose.connect('mongodb://localhost/taodou');

/*
 * 商品路由.
 */
exports.Goods = function(req, res) {
	if (req.method == 'POST') {
		if (req.body.title) { //来自插件
			handlePostData(req.body);
		} else { //来自WEB
			fetch.startFetch(req.body.originURL, handlePostData);
		}
		function handlePostData(postData){
			console.log(unescape(postData.title));
			var newGoods = new Goods({
				title: unescape(postData.title), //为兼容插件，crossrider发布时用的是escape了, 不是encodeURI。
				url: postData.url,
				image: postData.image,
				mall: unescape(postData.site),
				catelog: postData.catelog,
				oldPrice: postData.price,
				newPrice: postData.newPrice
			});
			newGoods.save(function(err){
				if (err) {
					console.log(err);
					return res.json({type: 'fail', data: err.message })
				}
				return res.json({type: 'success', _id: newGoods.id, data: newGoods }) //前面的为_id, 后面id和_id均可
			})
		}
	} else if (req.method == 'GET') {
		var q = {};
		req.params.type == 'mall' ? q.mall =
		req.params.name||/.*?/ : q.mall = req.params.name||/.*?/;
		//字段加catelog后，把后面的mall改为catelog
		Goods.find(q, null, {sort: [['_id', -1]]}, function(err,goods){
			if (err) {
				console.log(err);
				return res.json({type: 'fail', data: err.message })
			}
			return res.json({type: 'success', data: goods })
		})
	}
};

/*
 * deals路由.
 */
exports.deals = function(req, res){
	Deal.find({}, null, {sort: [['_id', -1]]}, function(err,deals){
		if (err) {
			console.log(err);
			return res.json({type: 'fail', data: err.message })
		}
		return res.json({type: 'success', data: deals })
	})
}

/*
 * 注册路由.
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
			return res.json({type: 'fail', data: '邮箱已存在！' })
		}
		newUser.save(function(err){
			if (err) {
				console.log(err);
				return res.json({type: 'fail', data: err.message })
			}
			// res.cookie('user', newUser, {path: '/', httpOnly: false});
			req.session.user = newUser;
			return res.json({type: 'success', data: '注册成功！' })
		})

	})
};

/*
 * 登录路由.
 */
exports.login = function(req, res) {
	var md5 = crypto.createHash('md5');
	var password = req.body.password !== '' ? md5.update(req.body.password).digest('base64') : '';
	User.find({email: req.body.email}, null, function(err,user){
		if (user.length == 0) {
			return res.json({type: 'fail', data: '电子邮箱或密码错误！' })
		}
		if (user[0].password != password) {
			return res.json({type: 'fail', data: '电子邮箱或密码错误！' })
		}
		req.session.user = user[0];
		return res.json({type: 'success', data: '登录成功！' })

	})
};

exports.logout =  function(req, res){
		req.session.user = null;
		return res.json({type: 'success', data: '登出成功！' })
};

/*
 * index路由.
 */
exports.index = function(req, res) {
	// console.log('current user: '+ req.cookies.user);
	// console.log('current user: '+ req.session.user);
	if ((!req.session.user)) {
		fs = require("fs");
		res.writeHead(200, {"Content-Type": "text/html"});
		fs.readFile('./public/index.html', function(err, data) {
			return res.end(data);
		});
		// res.redirect('index.html')
	} else {
		// res.redirect('mainlist.html') 
		fs = require("fs");
		res.writeHead(200, {"Content-Type": "text/html"});
		fs.readFile('./public/main.html', function(err, data) {
			return res.end(data);
		});
	}
	
};

