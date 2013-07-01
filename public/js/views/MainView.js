define([
	// 'masonry', // 貌似以AMD的方式加载会出问题（以为原文件为打包后的masionry.pkgd.js）
	'jquery', 
	'backbone', 
	'doT',
	'text!/js/tmpl/mainText.html', 
	'models/GoodsModel', 
	'collections/GoodsCollection',
	'views/DetailView'
	], function($, Backbone, doT, mainText, GoodsModel, GoodsCollection, DetailView){
		
	var MainView = Backbone.View.extend({

		// -------------------------- 相关元件 -------------------------- //

		el: $('#rightContainer'),

		template: doT.template(mainText),

		// -------------------------- 初始化及render函数 -------------------------- //

		initialize : function(){
			// var container = $('#masonry');
			// var msnry = new Masonry( container, {
			//   // options...
			//   itemSelector: '.span3',
			//   columnWidth: 200
			// });
		},
		
		render: function(){
			var that = this; // 在initialize函数中设定_.bindAll(this, 'render')，则可能不需如此
			var goodsCollection = new GoodsCollection();
			goodsCollection.fetch({
				success: function(collection, res, option) {
					console.log(collection.models[0].attributes); //model.attributes.title == model.get('title')
					$(that.el).html(that.template(goodsCollection.models));
				}
			});
			
		},

		// -------------------------- 初始化及render函数 -------------------------- //
		events: {
			'click .img-polaroid': 'showDetail'
		},

		showDetail: function(e){
			console.log(e.target.attributes.info.value);
			var info = JSON.parse(e.target.attributes.info.value);
			console.log(info);
			var detailView = new DetailView();
			detailView.render(info);
			return false;
		}

	})

	return MainView;
})
