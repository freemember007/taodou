define(['jquery', 'backbone',  'doT' ,'text!/js/tmpl/regText.html', 'models/UserModel'], function($, Backbone, doT, regText, UserModel){
		
	var RegView = Backbone.View.extend({
		el: $('#regContainer'),
		template: doT.template(regText),
		initialize : function(){
			console.log('RegView Loaded!'); 
		},
		events: {
			'submit #regForm': 'register'
		},
		render: function(){
			$(this.el).html(this.template());
		},
		register: function(){
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
							location.assign('/');
						}
						setTimeout(loginOK, 200);

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