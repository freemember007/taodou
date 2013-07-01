define(['jquery', 'backbone', 'doT' ,'text!/js/tmpl/mainText.html', ], function($, Backbone, doT, mainText, ){
		
	var navView = Backbone.View.extend({

		// 相关元件
		el: $('#mainContainer'),

		template: doT.template(navText),

		// 初始化及render函数
		initialize : function(){
			console.log('MainView Loaded!'); 
		},
		
		render: function(){
			var that = this;
			var goodsCollection = new GoodsCollection();
			goodsCollection.fetch({
				success: function(collection, res, option) {
					console.log(collection.models[0].attributes); //model.attributes.title == model.get('title')
					$(that.el).html(that.template(goodsCollection.models));
				}
			});
			
		},

		// 事件及事件函数
		// events: {
		// 	'click #logout': 'logout'
		// },

		// logout: function(){
		// 	$.get('/api/logout',function(err,res){
		// 		location.assign('/');
		// 	})
		// }

	})

	return navView;
})