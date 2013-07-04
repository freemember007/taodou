define([
	// 'masonry', // 貌似以AMD的方式加载会出问题（以为原文件为打包后的masionry.pkgd.js）
	'jquery', 
    'backbone', 
	'doT',
	'text!/js/tmpl/mainText.html', 
	'models/GoodsModel', 
	'collections/GoodsCollection',
    'views/DetailView',
    'domReady', 
    'lazyload'
	], function($, Backbone, doT, mainText, GoodsModel, GoodsCollection, DetailView){
		
	var MainView = Backbone.View.extend({

		// -------------------------- 相关元件 -------------------------- //

		el: $('#rightContainer'),

		template: doT.template(mainText),

		// -------------------------- 初始化及render -------------------------- //

        initialize : function(){
            console.log(this.collection); // 有效，可以在其他地方改变些集合的内容
            _.bindAll(this, 'render');
            //this.model.on('add', this.render, this);
			// var container = $('#masonry');
			// var msnry = new Masonry( container, {
			//   // options...
			//   itemSelector: '.span3',
			//   columnWidth: 200
			// });
        },
        //model: new GoodsModel(),
        collection: GoodsCollection,
		render: function(url){
			var that = this; // 貌似在initialize函数中设定_.bindAll(this, 'render')也不能替代此方法
            //var goodsCollection = new GoodsCollection();
            this.collection.url = url || 'api/Goods'
			this.collection.fetch({
                success: function(collection, res, option) {
					console.log('fetch ok!'); //model.attributes.title == model.get('title')
                    $(that.el).html(that.template(collection.models));
                    $("img.lazy").lazyload({ effect: 'fadeIn'});
				}
			});			
		},

		// -------------------------- 事件 -------------------------- //
		events: {
			'click .img-polaroid': 'showDetail'
		},

		showDetail: function(e){
			var info = JSON.parse(e.target.attributes.info.value);
			var detailView = new DetailView();
			detailView.render(info);
			return false;
		}

	})

	return MainView;
})
