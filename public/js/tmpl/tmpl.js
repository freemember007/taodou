define(['doT',
		'text!/js/tmpl/regForm.html',
		'text!/js/tmpl/mainText.html'
], function(doT, regFormText, mainText) {
	return {
		regForm: doT.template(regFormText),
		mainList: doT.template(mainText)
	};
});