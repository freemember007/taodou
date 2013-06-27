define(['doT',
		'text!/js/tmpl/mainText.html'
], function(doT, mainText) {
	return {
		mainTmpl: doT.template(mainText)
	};
});