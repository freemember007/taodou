// var tempFn = doT.template("<h1>Here is a sample template {{=it.foo}}</h1>");
var baseURL = location.protocol + '//' + location.host + '/'


var regView = regTmpl();
$('body').append(regView);


// $(document).ready(function(){
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
				  	var listView = listTmpl();
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
// })
