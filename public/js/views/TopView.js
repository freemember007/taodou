define([
	'jquery', 
	'backbone',
	'underscore',
	'doT',
	'text!/js/tmpl/topText.html', 
	'views/MainView', 
	'models/GoodsModel',
	'collections/GoodsCollection'
	], function($, Backbone, _, doT, topText, MainView, GoodsModel, goodsCollection){
		
	var TopView = Backbone.View.extend({

		// -------------------------- 相关元件 -------------------------- //

		el: $('#top-container'),

		template: doT.template(topText),

		// -------------------------- 初始化及render -------------------------- //

		initialize : function(){
			
		},
		
		render: function(){
			$(this.el).html(this.template());
		},

		// -------------------------- 事件  -------------------------- //
		events: {
			'click #add-button': 'addGoods'
		},
		
		addGoods: function(){
			console.log(goodsCollection.length);
			var originURL = $('#add-input').val();
			var goodsModel = new GoodsModel({originURL:encodeURI(originURL)});
			goodsModel.save(null, {
				success: function(model, response, options){
					console.log(goodsModel.id);
					goodsModel.clear().set(response.data); // 重设model属性
					console.log(goodsModel);
					goodsCollection.add(goodsModel, {at: 0}); // 为何会触发render事件？
					console.log(goodsCollection.length);
				}
			})
		}
	})

	return TopView;
})
