define([
	'views/LeftView',
	'views/TopView',
	'views/MainView',
	'views/DetailView',
	'collections/GoodsCollection'
], function(LeftView, TopView, MainView, DetailView, goodsCollection) {
	
	// ------------------ 定义路由组件 ---------------- //
	// var goodsCollection = new GoodsCollection();
	var mainView = new MainView({collection: goodsCollection});
	var leftView = new LeftView();
		leftView.render();
		var topView = new TopView();
		topView.render();
		//alert($('#breadcrumb').text()) //经测试，路由可以操控页面所有元素
	var MainRouter = Backbone.Router.extend({

		routes: {
			'logout': 'logout',
			':type/:name': 'showType',
			'*actions': 'defaultAction'
		},

		logout: function() {
			$.get('/api/logout',function(err,res){
				location.assign('/');
			})
		},

		/* 按商城或类别显示 */
		showType: function(type, name) { 
				mainView.collection.url =  '/api/Goods/' + type + '/' + name;
				mainView.collection.fetch();
		},

		defaultAction: function() {
				mainView.collection.fetch()
		}
		
		});

	// ------------------ 初始化路由组件 ---------------- //

	var init = function(){
		var mainRouter = new MainRouter();
		Backbone.history.start();
	};

	return { 
		init: init
	};

});
