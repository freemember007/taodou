define([
		'backbone',
], function(Backbone) {

	var GoodsModel = Backbone.Model.extend({

		urlRoot: '/api/Goods',

		defaults: {
			
		},

		validate: function (attrs) {
			for (var key in attrs) {
				var value = attrs[key];
				if (key === 'title') {
					if (value.length <= 0) {
							return 'Error: No title!';
					}
				}
				if (key === 'oldPrice') {
					if (value.length == NaN) {
							return 'Error: 价格不是数字!';
					}	
				}	
			}
		},

		// parse: function(res) {
		// 	// because of jsonp 
		// 	return res.data;
		// }

	});

	return GoodsModel;
});