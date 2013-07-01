require.config({
	paths: {
		'jquery': 'components/jquery/jquery.min',
		'bootstrap': 'components/bootstrap/docs/assets/js/bootstrap.min',
		'doT': 'components/doT/doT.min',
		'text': 'components/text/text',
		'backbone': 'components/backbone-amd/backbone-min',
		'underscore': 'components/underscore-amd/underscore-min',
		// 'masonry': 'components/masonry/masonry',
		// 'outlayer': 'components/outlayer/outlayer',
		// 'get-size': 'components/get-size/get-size',
		// 'get-style-property': 'components/get-style-property/get-style-property'
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