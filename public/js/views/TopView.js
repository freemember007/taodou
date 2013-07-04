define([
	'jquery', 
	'backbone',
	'underscore',
	'doT',
	'text!/js/tmpl/topText.html', 
	'views/MainView', 
	'models/GoodsModel'
	], function($, Backbone, _, doT, topText, MainView, GoodsModel){
		
	var TopView = Backbone.View.extend({

		// -------------------------- 相关元件 -------------------------- //

		el: $('#top-container'),

		template: doT.template(topText),

		// -------------------------- 初始化及render -------------------------- //

		initialize : function(){
			//alert(goodsCollection);
		},
		
		render: function(){
			$(this.el).html(this.template());
		},

		// -------------------------- 事件  -------------------------- //
		events: {
			'click #add-button': 'addGoods'
		},
		
		addGoods: function(){
			var originURL = $('#add-input').val();
			/*$.post('/api/Goods',{originURL:originURL}, function(data){*/
				//alert(data.info);
			/*})*/
			var goodsModel = new GoodsModel({originURL:originURL});
			goodsModel.save(null, {
				success: function(model, response, options){
					alert('a')
					alert(model.id);
					console.log(response.info);
					console.log(options);
				}
			})
		}
	})

	return TopView;
})
