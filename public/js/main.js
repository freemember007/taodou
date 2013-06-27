require.config({
	paths: {
		'jquery': 'components/jquery/jquery.min',
		'bootstrap': 'components/bootstrap/docs/assets/js/bootstrap.min',
		'doT': 'components/doT/doT.min',
		'text': 'components/text/text',
		'mainTmpl': 'tmpl/mainTmpl',
		'backbone': 'components/backbone-amd/backbone-min',
		'underscore': 'components/underscore-amd/underscore-min'
	},
	// shim: {
	// 	'backbone': {
	// 		deps: ['underscore'],
	// 		exports: 'Backbone'
	// 	}
	// }
})

require([
  'mainRouter',
], function(mainRouter){
  mainRouter.init();
});