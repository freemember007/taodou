require.config({
	paths: {
		'jquery': 'components/jquery/jquery.min',
		'bootstrap': 'components/bootstrap/docs/assets/js/bootstrap.min',
		'doT': 'lib/doT.min',
		'text': 'lib/text',
		'tmpl': 'tmpl/tmpl',
		'backbone': 'components/backbone/backbone-min',
		'underscore': 'components/underscore/underscore-min'
	},
	shim: {
		'backbone': {
			deps: ['underscore'],
			exports: 'Backbone'
		}
	}
})

require(['jquery', 'backbone', 'tmpl'], function($, Backbone, tmpl){
	
	var baseURL = location.protocol + '//' + location.host + '/';
	
	var RegView = Backbone.View.extend({
		el: $('#regContainer'),
		template: tmpl.regForm,
		initialize : function(){
			console.log('RegView Loaded!'); 
		},
		events: {
			'submit #regForm': 'submit'
		},
		render: function(){
			$(this.el).html(this.template());
		},
		submit: function(){
			$.post(baseURL + "api/reg",{
		  		email: $('#inputEmail').val(),
				  name: $('#inputName').val(),
				  password: $('#inputPassword').val()
				},
				function(data,status){
				  if (data.type == 'success') {
				  	// alert(data.info)
				  	$('#regAlert').remove();
				  	$('#regForm').prepend("<div class='alert alert-success' id='regAlert'>" + data.info + "</div>");
				  	function loginOK(){
				  		$('#regForm').remove();
					  	// var listView = tmpl.mainList();
					  	// $('body').append(listView);
					  	location.assign(baseURL+'mainList.html')
				  	}
				  	setTimeout(loginOK, 500);

				  } else {
				  	$('#regAlert').remove();
				  	$('#regForm').prepend("<div class='alert alert-error' id='regAlert'>" + data.info + "</div>");
				  	// alert(data.info)
				  }
				}
			);
			return false;
		}
	})

	var regView = new RegView();
	regView.render()
})