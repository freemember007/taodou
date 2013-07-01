define([
	'backbone',
	'views/MainView',
	'views/DetailView',
], function(Backbone, MainView, DetailView) {
	
	var MainRouter = Backbone.Router.extend({

		routes: {
			'logout': 'logout',
			'detail': 'showDetail',
			'*actions': 'defaultAction'
		},

		logout: function() {
			$.get('/api/logout',function(err,res){
				location.assign('/');
			})
		},

		showDetail: function() {
			// alert('a')
			var detailView = new DetailView();
		},

		defaultAction: function() {
			var mainView = new MainView();
			mainView.render();
		}
		
	});
	
	var init = function(){
		var mainRouter = new MainRouter;
		Backbone.history.start();
	};

	return { 
		init: init
	};

});
