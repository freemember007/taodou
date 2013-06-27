define(['jquery', 'backbone', 'tmpl', 'models/UserModel'], function($, Backbone, tmpl, UserModel){
	
	// var baseURL = location.protocol + '//' + location.host + '/';
	
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
			var user = new UserModel();
			user.on("invalid", function(model, error) {
			  alert(error);
			});
			user.set({email: $('#inputEmail').val(), name: $('#inputName').val(), password: $('#inputPassword').val()});
			user.save(null, {
				success: function(model, res){
					if (res.type == 'success') {
				  	$('#regAlert').remove();
				  	$('#regForm').prepend("<div class='alert alert-success' id='regAlert'>" + res.info + "</div>");
				  	function loginOK(){
				  		$('#regForm').remove();
					  	// location.assign('mainList.html')
					  	location.reload();
				  	}
				  	setTimeout(loginOK, 500);

				  } else {
				  	$('#regAlert').remove();
				  	$('#regForm').prepend("<div class='alert alert-error' id='regAlert'>" + res.info + "</div>");
				  }
				},
				error: function(model, res){
					alert(res)
				}
			});

			return false;
		}
	})

	return RegView;
})