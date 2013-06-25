define(['doT',
		'text!/js/tmpl/regForm.html',
		'text!/js/tmpl/mainList.html'
], function(doT, regFormText, mainListText) {
	return {
		regForm: doT.template(regFormText),
		mainList: doT.template(mainListText)
	};
});