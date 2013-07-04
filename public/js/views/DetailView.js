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
			// console.log('initialized!')
		},
		
		render: function(data){
			$(this.template(data)).appendTo($('body')).hide().fadeIn().slideDown();
		},

		// ----------------------------- 事件 --------------------- //

		events: {
			'click #close': 'close',
			'keypress': 'cancel'
		},

	 	close: function(){
			$('#modal-wrapper').fadeOut().remove(); // 重要！否则事件监听会出问题
			//location.hash = null;
			this.$el.unbind('keypress'); 
			return false;
		},
	
		cancel: function(e){
			if(e.keyCode == 27){
				this.close();
			}
		}

	})

	return DetailView;
})
