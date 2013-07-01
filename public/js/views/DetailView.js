define([
	// 'masonry', // 貌似以AMD的方式加载会出问题（以为原文件为打包后的masionry.pkgd.js）
	'jquery', 
	'backbone', 
	'doT',
	'text!/js/tmpl/detailText.html', 
	'models/GoodsModel', 
	'collections/GoodsCollection'
	], function($, Backbone, doT, detailText, GoodsModel, GoodsCollection){
		
	var DetailView = Backbone.View.extend({

		// -------------------------- 相关元件 -------------------------- //

		el: $('body'), // el并非必需的，但若定义event，则它是必需的，因event必须在el范围内，注意，这里若设置为“modal-wrapper”，则是不行的

		template: doT.template(detailText),

		// --------------------- 初始化及render函数 --------------------- //

		initialize : function(){
			//$(this.template({title:'aaa','img':'bbb'})).appendTo($('body')).hide().fadeIn().slideDown();
		},
		
		render: function(data){
			$(this.template(data)).appendTo($('body')).hide().fadeIn().slideDown();
		},

		// 事件及事件函数

		events: {
			'click #close': 'close',
			'keypress': 'cancel'
		},

	 	close: function(){
			$('#modal-wrapper').fadeOut().remove(); // 重要！否则事件监听会出问题
			//location.hash = null;
			this.$el.unbind('keypress'); // 或this.$el.unbind('keypress');
			e.preventDefault();
			e.stopPropagation();
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
