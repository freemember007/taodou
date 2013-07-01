define([
	'backbone',
	'views/RegView',
	'views/LoginView',
], function(Backbone, RegView, LoginView) {
	
	var IndexRouter = Backbone.Router.extend({

		routes: {
			'login': 'showLogin',
			'reg': 'showReg',
			'*actions': 'defaultAction'
		},

		showLogin: function() {
			$('#regContainer').empty();
			var loginView = new LoginView();
			setTimeout(function(){loginView.render()},200);
		},

		showReg: function() {
			$('#regContainer').empty();
			var regView = new RegView();
			setTimeout(function(){regView.render()},200);
		},

		defaultAction: function() {
			var regView = new RegView();
			regView.render();
		}
		
	});
	
	var init = function(){
		var indexRouter = new IndexRouter;
		Backbone.history.start();
	};

	return { 
		init: init
	};

});
