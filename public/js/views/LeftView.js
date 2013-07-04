define([
	'jquery', 
	'backbone',
	'underscore',
	'doT',
	'text!/js/tmpl/leftText.html', 
	'models/GoodsModel', 
	'collections/GoodsCollection'
	], function($, Backbone, _, doT, leftText, GoodsModel, GoodsCollection){
		
	var LeftView = Backbone.View.extend({

		// -------------------------- 相关元件 -------------------------- //

		el: $('#leftContainer'),

		template: doT.template(leftText),

		// -------------------------- 初始化及render -------------------------- //

		initialize : function(){
			//_.bindAll(this, 'render');
		},
		
		render: function(){
			$(this.el).html(this.template());
		},

		// -------------------------- 事件  -------------------------- //
		events: {
		},

	})

	return LeftView;
})

