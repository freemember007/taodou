define([
	'underscore',
	'backbone',
	'models/GoodsModel'
], function(_, Backbone, GoodsModel){

	var GoodsCollection = Backbone.Collection.extend({
			
			model: GoodsModel,

			url: '/api/Goods',
					
			parse : function(res) {
					return res.data;
			}
		 
	});

	return GoodsCollection;

});