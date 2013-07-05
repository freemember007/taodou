//-------------------- 设定变量 --------------------//
var sites, site, productID, fetchURL;
var postData = {};
var fs = require('fs');
var crypto = require('crypto');
var http = require('http');
//var http = require('follow-redirects').http; //想用它处理302，但无效
var needle = require('needle'); //超简单的request插件，自动转码、自动json parse、处理302错误很赞
//var request = require('request'); //专业级的request插件，怪不得近3000人follow
var cheerio = require('cheerio'); //轻量级DOM解析，风格同jquery，超赞！
var qs=require('querystring');
var moment = require('moment');
var timeNow = moment().format('YYYY-MM-DD hh:mm:ss');
console.log('现在时间为：' + timeNow);
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
			if (k == 'jd'){
				productID = originURL.match(eval('/'+site.productID+'/'))[1];
				fetchURL =  site.MobileURL.replace('888888', productID);
				console.log(fetchURL);
			} else {
				fetchURL = originURL;
			}
			if (k === 'taobao' || k === 'tmall') {
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
	var queryStr = '4f7364c91a3626b98330326a134dc5dc' + 'app_key21535453' + 'formatjson' + 'item_id' + productID + 'methodtaobao.ump.promotion.get' + 'sign_methodmd5' + 'timestamp' + timeNow + 'v2.0' + '4f7364c91a3626b98330326a134dc5dc';
	var sign = crypto.createHash('md5').update(queryStr).digest('hex').toUpperCase();
	console.log('sign is ' + sign);
	var query = {
		method: 'taobao.ump.promotion.get',
		v: '2.0',
		format: 'json',
		item_id: productID,
		timestamp: timeNow,
		app_key: '21535453',
		sign_method: 'md5',
		sign: sign
	}
	var content = qs.stringify(query);
	var options = {
		hostname: 'gw.api.taobao.com',
		port: 80,
		path: '/router/rest',
		method: 'POST',
		headers:{
			'Content-Type':'application/x-www-form-urlencoded',
			'Content-Length':content.length
		}
	}
	var req = http.request(options, function(res) {
		var _data = '';
		res.on('data', function(chunk){
			_data += chunk;
		})
		res.on('end', function(){
			console.log(_data);
			var data = JSON.parse(_data);
			var promotionInfo = data.ump_promotion_get_response.promotions.promotion_in_item.promotion_in_item;
			console.log(promotionInfo);
			if (promotionInfo != undefined) {
				var _price = promotionInfo[0].item_promo_price;
				_price = parseFloat(_price.replace(',','')).toFixed(2);
				console.log(_price);
			}
			normalFetch(callback, _price);
		})
	});
	req.write(content);
	req.end();
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
		console.log($);
		postData.url = fetchURL;
		postData.site = site.sitename;
		//postData.title = (data.match(new RegExp(site.title))||[])[1];
		postData.title = eval(site.title);//
		console.log(site.title);
		//postData.image = (data.match(new RegExp(site.image))||[])[1];
		postData.image = eval(site.image);//
		console.log(site.image);
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
