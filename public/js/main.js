require.config({
	paths: {
		'jquery': 'components/jquery/jquery.min',
		'bootstrap': 'components/bootstrap/docs/assets/js/bootstrap.min',
		'doT': 'lib/doT.min',
		'text': 'lib/text',
		'tmpl': 'tmpl/tmpl'
	}
})

require(['jquery', 'tmpl'],function($, tmpl){
	
	var baseURL = location.protocol + '//' + location.host + '/'

	var regView = tmpl.regForm();

	$('body').append(regView);

	$('#regForm').submit(function(){
	  $.post(baseURL + "api/reg",{
	  		email: $('#inputEmail').val(),
			  name: $('#inputName').val(),
			  password: $('#inputPassword').val()
			},
			function(data,status){
			  if (data.type == 'success') {
			  	// alert(data.info)
			  	$('#regAlert').remove();
			  	$('#regForm').prepend("<div class='alert alert-success' id='regAlert'>" + data.info + "</div>");
			  	function loginOK(){
			  		$('#regForm').remove();
				  	var listView = tmpl.mainList();
				  	$('body').append(listView);
			  	}
			  	setTimeout(loginOK, 500);

			  } else {
			  	$('#regAlert').remove();
			  	$('#regForm').prepend("<div class='alert alert-error' id='regAlert'>" + data.info + "</div>");
			  	// alert(data.info)
			  }
			}
		);
		return false;
	});	
})