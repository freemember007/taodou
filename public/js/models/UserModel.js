define([
		'backbone',
], function(Backbone) {

	var UserModel = Backbone.Model.extend({

		urlRoot: '/api/reg',

		defaults: {
			email: '',
			name: '',
			avatar: '',
			password: ''
		},

		validate: function (attrs) {
      for (var key in attrs) {
        var value = attrs[key];
        if (key === 'email') {
          if (value.length <= 0) {
              return 'Error: No email!';
          }
        }
        if (key === 'password') {
          if (value.length <= 0) {
              return 'Error: No password!';
          }	
        }	
    	}
    },

		parse: function(res) {
			// because of jsonp 
			return res.data;
		}

	});

	return UserModel;
});