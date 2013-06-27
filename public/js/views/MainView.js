define(['jquery', 'backbone', 'mainTmpl', 'models/GoodsModel', 'collections/GoodsCollection'], function($, Backbone, mainTmpl, GoodsModel, GoodsCollection){
	
	// var baseURL = location.protocol + '//' + location.host + '/';
	
	var MainView = Backbone.View.extend({
		el: $('#mainContainer'),
		template: mainTmpl.mainTmpl,
		initialize : function(){
			console.log('MainView Loaded!'); 
		},
		events: {
			'submit #regForm': 'submit'
		},
		render: function(){
			$(this.el).html(this.template());
		},
	})

	return MainView;
})