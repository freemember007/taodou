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

		el: $('body'), // 注意：event必须在el范围内

		template: doT.template(detailText),

		// ------------------------ 初始化及render --------------------- //

		initialize : function(){
			this.listenTo(this.model, 'change', this.render);
		},
		
		render: function(){
			$(this.template(this.model)).appendTo(this.$el).hide().fadeIn().slideDown();
		},

		// ----------------------------- 事件 --------------------- //

		events: {
			'click #close': 'close',
			'keypress': 'cancel'
		},

	 	close: function(){
			$('#modal-wrapper').fadeOut('fast', function(){$(this).remove()}); // 重要！否则事件监听会出问题
		},
	
		cancel: function(e){
			if(e.keyCode == 27){
				this.close();
			}
		}

	})

	return DetailView;
})
