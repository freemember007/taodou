//-------------------- 设定变量 --------------------//
var sites, site, productID, fetchURL;
var postData = {};
var fs = require('fs');
var util = require('util');
//var crypto = require('crypto');
//var http = require('http');
//var http = require('follow-redirects').http; //想用它处理302，但无效
var needle = require('needle'); //超简单的request插件，自动转码、自动json parse、处理302错误很赞
//var request = require('request'); //专业级的request插件，怪不得近3000人follow
var cheerio = require('cheerio'); //轻量级DOM解析，风格同jquery，超赞！
var qs=require('querystring');
var taobao = require('taobao');
//var moment = require('moment');
//var timeNow = moment().format('YYYY-MM-DD hh:mm:ss');
//console.log('现在时间为：' + timeNow);
Number.prototype.toPercent = function() {
	return (Math.round(this * 10000) / 100).toFixed(0) + '%';
};

//-------------------- 开始Fetch --------------------//
exports.startFetch = function(originURL, callback){
	fs.readFile('sites.json', 'utf-8', function(err, file){
		if(err){
			console.log(err);
			return
		}
		sites = JSON.parse(file);
		fetchNew(originURL, callback);
	})
}

//-------------------- 选择配置 --------------------//

function fetchNew(originURL, callback){
	console.log('start Fetch...')
	for (var k in sites){
		console.log('match: ' + k);
		if (originURL.match(eval('/'+sites[k].match+'/'))) {
			site = sites[k];
			var urlReg = new RegExp(site.url);
			if (k == 'jd'){
				productID = originURL.match(eval('/'+site.productID+'/'))[1];
				fetchURL =  site.MobileURL.replace('888888', productID);
				console.log(fetchURL);
			} else {
				fetchURL = originURL.match(urlReg)[0];
				console.log(fetchURL);
			}
			if (k === 'taobao' || k === 'tmall') {
				fetchURL = originURL.match(urlReg)[1] + originURL.match(urlReg)[2];
				console.log(fetchURL);
				productID = originURL.match(/id=(\d+)/)[1];
				console.log('productID is ' + productID);
				fetchTaobao(callback);
			} else {
				normalFetch(callback);
			}
			return;
		}
	}
}

//-------------------- 淘宝、天猫Fetch --------------------//

function fetchTaobao(callback) {
	taobao.config({
		app_key: '21535453',
		app_secret: '4f7364c91a3626b98330326a134dc5dc'
	});
	taobao.taobaokeWidgetItemsConvert({
		num_iids: productID,
		fields: 'click_url'
	}, function(data){
		console.log(util.inspect(data));
		
	})
	//return;
	taobao.umpPromotionGet({
		item_id: productID,
	}, function(data) {
		var promotionInfo = data.ump_promotion_get_response.promotions.promotion_in_item.promotion_in_item;
		if(promotionInfo != undefined){
			var _price = promotionInfo[0].item_promo_price;
			_price = parseFloat(_price.replace(',','')).toFixed(2);
			console.log(_price);
		}
		normalFetch(callback, _price);
	});
}

//-------------------- 正常Fetch --------------------//
function normalFetch(callback, apiPrice){
	console.log('normalFetch...');
	needle.get(fetchURL, {follow: true}, function(error, res, data){
		if(error){
			console.log("Got error: " + error);
		}
		var $ = cheerio.load(data);
		console.log("Got status code: " + res.statusCode);
		postData.url = fetchURL;
		postData.site = site.sitename;
		postData.title = eval(site.title);
		postData.image = eval(site.image);
		console.log(postData.image);
		var reg = new RegExp('(' + site.fetchPrice + ')[$￥¥\\s]*([\\d,]+\\.?\\d*)', 'm')
		price = (data.match(reg)||[])[2]||',';
		price = parseFloat(price.replace(',',''));
		console.log(price);
		postData.price= apiPrice || price.toFixed(2)
		postData.newPrice = postData.price;
		callback(postData);
	});	
}

