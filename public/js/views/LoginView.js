define(['jquery', 'backbone',  'doT' ,'text!/js/tmpl/loginText.html', 'models/UserModel'], function($, Backbone, doT, loginText, UserModel){
		
	var RegView = Backbone.View.extend({

		el: $('#regContainer'),
		template: doT.template(loginText),

		initialize : function(){
			console.log('LoginView Loaded!'); 
		},

		render: function(){
			$(this.el).html(this.template());
		},

		events: {
			'submit #loginForm': 'login'
		},

		login: function(){

			var UserLoginModel = UserModel.extend({
				urlRoot: '/api/login',
			})
			var user = new UserLoginModel();

			user.on("invalid", function(model, error) {
				alert(error);
			});
			
			user.set({email: $('#inputEmail').val(), password: $('#inputPassword').val()});
			
			user.save(null, {
				success: function(model, res){
					if (res.type == 'success') {
						$('#loginAlert').remove();
						$('#loginForm').prepend("<div class='alert alert-success' id='loginAlert'>" + res.data + "</div>");
						function loginOK(){
							$('#loginForm').remove();
							location.assign('/');
						}
						setTimeout(loginOK, 200);

					} else {
						$('#loginAlert').remove();
						$('#loginForm').prepend("<div class='alert alert-error' id='loginAlert'>" + res.data + "</div>");
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