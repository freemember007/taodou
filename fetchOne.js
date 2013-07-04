//-------------------- 设定变量 --------------------//
var sites, site, productID, fetchURL;
var postData = {};
var fs = require('fs');
var crypto = require('crypto');
var http = require('http');
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
			} else {
				fetchURL = originURL;
			}
			if (k === 'taobao' || k === 'tmall') {
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
	var queryStr = '4f7364c91a3626b98330326a134dc5dc' + 'app_key21535453' + 'formatjson' + 'item_id' + dataItems[i].key.match(/id=(\d+)/)[1] + 'methodtaobao.ump.promotion.get' + 'sign_methodmd5' + 'timestamp' + '2008-01-25 20:23:30' + 'v2.0' + '4f7364c91a3626b98330326a134dc5dc';
	/*var sign = md5(queryStr).toUpperCase();*/
	var sign = crypto.createHash('md5').update(queryStr).digest('base64');
	console.log(sign)
	var query = {
		method: 'taobao.ump.promotion.get',
		v: '2.0',
		format: 'json',
		item_id: dataItems[i].key.match(/id=(\d+)/)[1],
		timestamp: '2008-01-25 20:23:30',
		app_key: '21535453',
		sign_method: 'md5',
		sign: sign
	}
	appAPI.request.post({
		url: 'http://gw.api.taobao.com/router/rest',
		postData: query,
		onSuccess: function(res) {
			console.log(res);
			var data = appAPI.JSON.parse(res);
			if (data.ump_promotion_get_response.promotions.promotion_in_item.promotion_in_item != undefined) {
				newPrice = parseFloat(data.ump_promotion_get_response.promotions.promotion_in_item.promotion_in_item[0].item_promo_price);
				nextStep(callback);
			} else {
				normalFetch(callback);
			}
		},
		onFailure: function(httpCode) {
			alert('Failed to retrieve content. (HTTP Code:' + httpCode + ')');
			normalFetch(callback);
		}
	});
}

//-------------------- 正常Fetch --------------------//
function normalFetch(callback){
	console.log('normalFetch...');
	var data = '';
	http.get(fetchURL, function(res) {
		res.on('data', function (chunk) {
			data += chunk;
		});
		res.on('end', function(){
			postData.url = fetchURL;
			postData.site = site.sitename;
			postData.title = (data.match(new RegExp(site.title))||[])[1];
			postData.image = (data.match(new RegExp(site.image))||[])[1];
			var reg = new RegExp('(' + site.fetchPrice + ')[$￥¥\\s]*([\\d,]+\\.?\\d*)', 'm')
			price = (data.match(reg)||[])[2]||',';
			price = parseFloat(price.replace(',',''));
			console.log(price);
			postData.price= price.toFixed(2)
			postData.newPrice = postData.price;
			callback(postData);
		})
	}).on('error', function(e) {
		console.log("Got error: " + e.message);
	});
}
