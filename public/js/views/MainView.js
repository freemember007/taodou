define([
	// 'masonry', // 貌似以AMD的方式加载会出问题（以为原文件为打包后的masionry.pkgd.js）
    'domReady', 
    'jquery', 
    'backbone', 
	'doT',
	'text!/js/tmpl/mainText.html', 
	'models/GoodsModel', 
	'collections/GoodsCollection',
    'views/DetailView',
    
    'lazyload'
	], function(domReady, $, Backbone, doT, mainText, GoodsModel, GoodsCollection, DetailView){
    
    var goodModel = new GoodsModel();
    var detailView = new DetailView({model: goodModel});

	var MainView = Backbone.View.extend({

		// -------------------------- 相关元件 -------------------------- //

		el: $('#rightContainer'),

		template: doT.template(mainText),

		// -------------------------- 初始化及render -------------------------- //

        initialize : function(){
            this.listenTo(this.collection, 'sync', this.render);
			// var container = $('#masonry');
			// var msnry = new Masonry( container, {
			//   // options...
			//   itemSelector: '.span3',
			//   columnWidth: 200
			// });
        },
        render: function(){
            this.$el.html(this.template(this.collection.models));
            $("img.lazy").lazyload({ effect: 'fadeIn'});
		},

		// -------------------------- 事件 -------------------------- //
		events: {
			'click .img-polaroid': 'showDetail'
		},

        showDetail: function(e){
            
            
            var modelID = e.target.attributes.modelID.value;
            goodModel.set(this.collection.get(modelID).attributes, {silent: true});
            goodModel.trigger('change');
			return false;
		}

	})

	return MainView;
})
