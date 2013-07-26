define([
		'backbone',
], function(Backbone) {

	var DealModel = Backbone.Model.extend({

		urlRoot: '/api/deals',
        idAttribute: '_id',

		defaults: {
			
		},		

		// parse: function(res) {
		// 	// because of jsonp 
		// 	return res.data;
		// }

	});

	return DealModel;
});
