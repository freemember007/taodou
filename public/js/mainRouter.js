define([
    'views/LeftView',
    'views/TopView',
	'views/MainView',
    'views/DetailView'
], function(LeftView, TopView, MainView, DetailView) {
	
    // ------------------ 定义路由组件 ---------------- //

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
            //MainView.url = 'a'
            console.log(MainView.prototype.collection)
            var mainView = new MainView(); //与下面的mainView的关系？ 
            var url =  '/api/Goods/' + type + '/' + name;
            MainView.prototype.render(url);
        },

		defaultAction: function() {
			var mainView = new MainView();
            mainView.render();
            var leftView = new LeftView();
            leftView.render();
            var topView = new TopView();
            topView.render();
		}
		
    });

	// ------------------ 初始化路由组件 ---------------- //

	var init = function(){
		var mainRouter = new MainRouter;
		Backbone.history.start();
	};

	return { 
		init: init
	};

});
