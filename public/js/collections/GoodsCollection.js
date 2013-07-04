define([
	'underscore',
	'backbone',
	'models/GoodsModel'
], function(_, Backbone, GoodsModel){

	var GoodsCollection = Backbone.Collection.extend({
			
		model: GoodsModel,

		url: '/api/Goods',
		
		// 自定义fetch构造子，避免多处重复写callback，同时someArg可作fetch参数
		fetch: function(someArg, options){
			console.log('start fetch!');
			typeof(options) != 'undefined' || (options = {});
			options.success = this.postProcess;
			options.error = this.handleError;
			return Backbone.Collection.prototype.fetch.call(this, options);
		},
		postProcess: function(res, status, xhr){
			console.log("I'm the success callback");
		}, 
		handleError : function(res, status, xhr){
			console.log("I'm the error callback");
		},

		// 从服务器返回的res hash取实际与collection对应的数据
		parse : function(res) {
			return res.data;
		}
		 
	});

	//返回一个单例singleton，从而可以跨view存在
	var goodsCollection = new GoodsCollection();
	return goodsCollection; 

});
