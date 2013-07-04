//-------------------- 设定变量&读取配置文件 --------------------//
var sites, site, productID, fetchURL;
var fs = require('fs');
var crypto = require('crypto');
var http = require('http');
fs.readFile('sites.json', 'utf-8', function(err, file){
	if(err){
		console.log(err);
		return
	}
	sites = JSON.parse(file);
	getSite('http://www.amazon.cn/ZOJIRUSHI%E8%B1%A1%E5%8D%B0SM-AFE50-AX%E4%B8%8D%E9%94%88%E9%92%A2%E7%9C%9F%E7%A9%BA%E4%BF%9D%E6%B8%A9%E6%9D%AF500ml/dp/B005680G96',
function(){console.log('c')});

})

Number.prototype.toPercent = function() {
	return (Math.round(this * 10000) / 100).toFixed(0) + '%';
};

//-------------------- 配置 --------------------//
function getSite(originURL, callback){
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

//-------------------- 正常抓取 --------------------//
function normalFetch(callback){
	console.log('normalFetch...');
	var data = '';
	var i = 1;
	http.get(fetchURL, function(res) {
		res.on('data', function (chunk) {
			data += chunk;
			i++;
		});
		res.on('end', function(){
			console.log('total chunk: ' + i);
			var reg = new RegExp('(' + site.fetchPrice + ')[$￥¥\\s]*([\\d,]+\\.?\\d*)', 'm')
			newPrice = data.match(reg)||[];
			newPrice = newPrice[2]||',';
			newPrice = parseFloat(newPrice.replace(',',''));
			console.log(newPrice);
			nextStep(callback);
		})
	}).on('error', function(e) {
		console.log("Got error: " + e.message);
	});
}

function nextStep(callback) {
	if (newPrice != undefined && !isNaN(newPrice) && newPrice != oldPrice && newPrice != dataItems[i].value.newPrice) {
		var newValue = dataItems[i].value;
		newValue.newPrice = newPrice.toFixed(2);
		newValue.percent = ((oldPrice - newPrice) / oldPrice).toPercent();
		newValue.hasDroped = 'true';
		appAPI.db.async.set(dataItems[i].key, newValue, appAPI.time.yearsFromNow(12), function() {
		});
		callback(arg1, arg2);
	}
}
