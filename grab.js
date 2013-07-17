//----------------- 变量与环境 -----------------//
var sites, site;
var util = require('util')
	, fs = require('fs')
	, _ = require('underscore')
	, needle = require('needle')
	, cheerio = require('cheerio')
	, FetchStream = require("fetch").FetchStream
	, async = require('async')
	, mongoose = require('mongoose')
	, models = require('./models')
	, Deal = models.Deal;
mongoose.connect('mongodb://localhost/taodou');

//----------------- 载入配置文件 -----------------//
var URL = 'http://www.smzdm.com/'
grabList(URL);

//---------------- 抓取dealList -----------------//
function grabList(URL){
	var dealList = [];
	util.log('页面下载开始...');
	needle.get(URL, {timeout: 15000, follow: true}, function(error, res, data){
		if(error) util.log("Got error: " + error);
		util.log('页面下载完毕');
		var $ = cheerio.load(data);
		$('div.perContentBox').each(function(i, elem){

			// 取基本信息
			var deal = {
				title: $(this).find('a').attr('title'),
				alink: $(this).find('a').attr('href'),
				blink: $(this).find('.border_radius_3').attr('href'),
				simage: $(this).find('.post_thumb_pic_main').attr('src'),
				promote: $(this).find('a').children('span').text(),
				source: '什么值得买'
			}
			util.log('第' + i + '条是：' + deal.title.replace(deal.promote,''));

			// 取价格和币种
			var regDollor = /(\d+\.?\d*)美[刀元]|(\d+\.?\d*)刀|\$\s*?(\d+\.?\d*)/;
			var regYuan = /(\d+\.?\d*)元|￥(\d+\.?\d*)|价格(\d+\.?\d*)/;
			if (deal.promote.match(regDollor)){
				deal.currency = '$';
				deal.price = _.compact(deal.promote.match(regDollor))[1];
			} else if (deal.promote.match(regYuan)) {
				deal.currency = '￥';
				deal.price = _.compact(deal.promote.match(regYuan))[1];
			}
			util.log('价格是：' + deal.currency + deal.price);

			// 取分类、商品名
			fs.readFile('./pnameDict.json', function(err, data) {//放在循环里是否会影响效率？
				var pnameDict = JSON.parse(data);
				_.each(pnameDict,function(vs, k, list){
					async.detect(vs, function(v, callback){
						callback(deal.title.indexOf(v) !== -1);
					}, function(result){
						if (result !== undefined) {
							deal.pname = result;
							deal.catelog = k;
							util.log('商品名是：' + deal.pname + '，分类是：' + k);
						}	
					})
				})
			});

			// 取品牌
			fs.readFile('./brandDict.txt', function(err, data) {
				var brandDict = _.compact(data.toString().split('\n'));
				async.detect(brandDict, function(v, callback){
					callback(deal.title.indexOf(v) !== -1);
				}, function(result){
					if (result !== undefined) {
						deal.brand = result;
						util.log('品牌是：' + deal.brand);
					}	
				})	
			})	
			// 将结果存到数组
			dealList.push(deal);
		})
		util.log('下一步...')
		grabDetail(dealList);	
	});	
}

//---------------- 抓取deal content -----------------//
function grabDetail(dealList){
	var i = 1;
	async.each(dealList, function(deal, callback) {
		needle.get(deal.alink, {timeout: 15000, follow: true}, function(err, res, body){
			if(err) util.log(err);
			util.log('解析第' + i + '条：' + deal.alink ); //应该不是按顺序走的吧？
			var $ = cheerio.load(body);
			deal.content = ($('.conBox').html()||'暂无内容').replace(/<a.*?a>|<script[\s\S]*?script>/g, '');
			deal.mimage = $('.conBox').find('img').first().attr('src')||'暂无图片';
			util.log('图片为：' + deal.mimage);
			util.log('内容为：' + deal.content.substr(0,10));
			i++;
			callback();
		});
	}, function(err) {
		if(err) { console.log(err) };
		filterData(dealList);
	})
}

//---------------- 解析真实购买地址 -----------------//
function filterData(dealList){
	async.each(dealList, function(deal, callback) {
		var fetch = new FetchStream(deal.blink, {timeout: 30000});
		fetch.on('error', function(err){
			callback(err); // 貌似这样挺危险，那我想继续怎么办？
		});
		fetch.on('meta', function(meta){
			deal.blink = unescape(meta.finalUrl);
			//util.log(deal.blink + '\n[FetchStream]'+ meta.finalUrl);
			fs.readFile('./siteURLs.json', function(err, data) {
				var siteURLs = JSON.parse(data);
				for (var k in siteURLs) {
					if (deal.blink.match(eval('/'+siteURLs[k].match+'/'))) {
						deal.mall = siteURLs[k].sitename;
						var urlReg = new RegExp(siteURLs[k].url);
						if (k === 'taobao' || k === 'tmall') {
							deal.blink = deal.blink.match(urlReg)[1] + deal.blink.match(urlReg)[2];
							console.log(deal.blink);
						} else {
							console.log(deal.blink);
							deal.blink = (deal.blink.match(urlReg)||[])[0]||deal.blink;
							console.log(deal.blink);
						}
						return;
					}	
				}
			})
			callback();
		});
	}, function(err) {
		if(err) { console.log(err); }
		console.log('all update!');
		saveDeal(dealList);
	})
}

//---------------- 保存deal数据 -----------------//
function saveDeal(dealList){
	async.each(dealList, function(deal, callback) {
	var newDeal = new Deal(deal);
		newDeal.save(function(err){
			if (err) { console.log(err) };
			callback();
		})	
	}, function(err) {
		if(err) { console.log(err) };
		console.log('all saved!');
	})
}
