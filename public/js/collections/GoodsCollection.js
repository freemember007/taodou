define([
	'underscore',
	'backbone',
	'models/GoodsModel'
], function(_, Backbone, GoodsModel){

	var GoodsCollection = Backbone.Collection.extend({
			
		model: GoodsModel,

		url: '/api/Goods',
		//与model的urlRoot的区别？
				
		parse : function(res) {
			return res.data;
		}
		 
	});
	var singleGoodsCollection = new GoodsCollection();
	return singleGoodsCollection;

});
