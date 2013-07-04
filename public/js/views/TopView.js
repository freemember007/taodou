define([
	'jquery', 
	'backbone',
	'underscore',
	'doT',
	'text!/js/tmpl/topText.html', 
	'views/MainView', 
	], function($, Backbone, _, doT, topText, MainView){
		
	var TopView = Backbone.View.extend({

		// -------------------------- 相关元件 -------------------------- //

		el: $('#top-container'),

		template: doT.template(topText),

		// -------------------------- 初始化及render -------------------------- //

		initialize : function(){
			//_.bindAll(this, 'render');
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
			$.post('/api/Goods',{originURL:originURL}, function(data){
				alert(data.info);
				//alert(MainView.model); //underfined
			})

		}
	})

	return TopView;
})
