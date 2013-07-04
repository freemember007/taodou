define([
	'jquery', 
	'backbone', 
	'doT',
	'text!/js/tmpl/detailText.html', 
	'models/GoodsModel', 
	'collections/GoodsCollection'
	], function($, Backbone, doT, detailText, GoodsModel, GoodsCollection){
		
	var DetailView = Backbone.View.extend({

		// -------------------------- 相关元件 -------------------------- //

		el: $('body'), 

		template: doT.template(detailText),

		// ------------------------ 初始化及render --------------------- //

		initialize : function(){
			this.listenTo(this.model, 'change', this.render);
		},
		
		render: function(){
			$(this.template(this.model)).appendTo(this.$el).hide().fadeIn();
		},

		// ----------------------------- 事件 --------------------- //

		events: {
			'click #close': 'close',
			'keypress': 'close'
		},

		close: function(e){
			if (e.type === 'click' || e.keyCode === 27){
				$('#modal-wrapper').fadeOut('fast', function(){$(this).remove()});
				return false;
			}
		}
	})

	return DetailView;
})
