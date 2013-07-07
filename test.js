var sites, site;
var util = require('util');
var fs = require('fs');
var request = require("request");
var needle = require('needle'); 
var cheerio = require('cheerio'); 
var _ = require('underscore');

// 获取302跳转后的地址。能follow几次？能否接受到头后即停止（提升速度）？

util.log('start Fetch!')
var URL = 'http://www.smzdm.com/go/262483';
request.get(URL, function (err, res, body) {
  util.log('[request]'+res.request.uri.href);
})

var fetchUrl = require("fetch").fetchUrl;
fetchUrl("http://www.smzdm.com/go/262483", function(error, meta, body){
	util.log('[fetchUrl]'+ meta.finalUrl + '\n' + meta.redirectCount);
});

var FetchStream = require("fetch").FetchStream;
var fetch = new FetchStream("http://www.smzdm.com/go/262483");
fetch.on("meta", function(meta){
	util.log('[FetchStream]'+ meta.finalUrl);
	return;
});
