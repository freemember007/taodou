//----------------- 变量与环境 -----------------//
var sites, site;
var util = require('util');
var fs = require('fs');
var needle = require('needle'); 
//var request = require("request");
var cheerio = require('cheerio');
var FetchStream = require("fetch").FetchStream;
var async = require('async');

//----------------- 载入配置文件 -----------------//
var listURL = 'http://www.smzdm.com/'
grabList(listURL);

//---------------- 抓取listData -----------------//
function grabList(listURL){
	var listData = [];
	util.log('页面下载开始...');
	needle.get(listURL, {timeout: 5000, follow: true}, function(error, res, data){
		if(error) util.log("Got error: " + error);
		util.log('页面下载完毕');
		var $ = cheerio.load(data);
		util.log('页面格式化完毕');
		$('div.perContentBox').each(function(i, elem){
			listData[i] = {
				URL: $(this).find('a').attr('href'),
				title: $(this).find('a').attr('title'),
				price: $(this).find('a').children('span').text(),
				sImage: $(this).find('.post_thumb_pic_main').attr('src'),
				bLink: $(this).find('.border_radius_3').attr('href')
			}
		})
		util.log('共' + listData.length + '条，第一条是：\n' + util.inspect(listData[0]));
		grabDetail(listData);
	});	
}

//---------------- 抓取detailData -----------------//
function grabDetail(listData){
	var i = 1;
	async.each(listData, function(data, callback) {
		data.detail = [];
		needle.get(data.URL, {timeout: 5000, follow: true}, function(err, res, body){
			if(err) util.log(err);
			util.log('解析第' + i + '条正文'); //应该不是按顺序走的吧？
			var $ = cheerio.load(body);
			$('.conBox').each(function(j, elem){
				var _detail =
				$(this).html().replace(/<a.*?a>|<script[\s\S]*?script>/g, '');
				util.log('内容为：' + _detail.substr(0,10))
				data.detail.push(_detail);
			})
			i++;
			callback();
		});
	}, function(err) {
		if(err) { console.log(err) };
		filterData(listData);
	})
}

//---------------- 过滤detailData数据 -----------------//
function filterData(listData){
	async.each(listData, function(data, callback) {
		var fetch = new FetchStream(data.bLink, {timeout: 5000});
		fetch.on('error', function(err){
			callback(err); // 貌似这样挺危险，那我想继续怎么办？
		});
		fetch.on('meta', function(meta){
			util.log(data.bLink + '\n[FetchStream]'+ meta.finalUrl);
			callback();
		});
		
	}, function(err) {
		if(err) { console.log(err); }
		console.log('all update!');
	})
}

//---------------- 保存数据 -----------------//
