require.config({
	paths: {
		'jquery': 'components/jquery/jquery.min',
		'bootstrap': 'components/bootstrap/docs/assets/js/bootstrap.min',
		'doT': 'components/doT/doT.min',
		'text': 'components/text/text',
        'domReady': 'components/requirejs-domready/domReady',
		'backbone': 'components/backbone-amd/backbone-min',
		'underscore': 'components/underscore-amd/underscore-min',
        'lazyload': 'components/jquery.lazyload/jquery.lazyload.min',
        'xdomainajax': 'lib/xdomainajax'
		// 'masonry': 'components/masonry/masonry',
		// 'outlayer': 'components/outlayer/outlayer',
		// 'get-size': 'components/get-size/get-size',
		// 'get-style-property': 'components/get-style-property/get-style-property'
	},
     shim: {
        // 	'backbone': {
        // 		deps: ['underscore'],
        // 		exports: 'Backbone'
        // 	}
        'lazyload': {
            deps: ['jquery'] //貌似此句可有可无 
        }, 
        'xdomainajax': {
            deps: ['jquery'] //貌似此句可有可无 
        }
    }
})

require([
    'mainRouter'
], function(mainRouter){
	mainRouter.init();
});
