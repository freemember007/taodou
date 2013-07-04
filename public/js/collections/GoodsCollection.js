define([
	'underscore',
	'backbone',
	'models/GoodsModel'
], function(_, Backbone, GoodsModel){

	var GoodsCollection = Backbone.Collection.extend({
			
		model: GoodsModel,

		url: '/api/Goods',
		
		// 自定义fetch构造子，如需要，someArg可作fetch参数
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
		parse : function(res) {
			return res.data;
		}
		 
	});
	return GoodsCollection;

});
