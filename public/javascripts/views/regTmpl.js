var regTmpl = doT.template("\
	<form class='form-horizontal' id='regForm'>\
    <div class='control-group'>\
    	<label class='control-label' for='inputEmail'>电子邮件</label>\
	    <div class='controls'>\
	    	<input type='text' id='inputEmail' placeholder='Email'>\
	    </div>\
    </div>\
    <div class='control-group'>\
	    <label class='control-label' for='inputName'>用户名</label>\
	    <div class='controls'>\
	    	<input type='text' id='inputName' placeholder='Name'>\
	    </div>\
    </div>\
    <div class='control-group'>\
	    <label class='control-label' for='inputPassword'>密码</label>\
	    <div class='controls'>\
	    	<input type='password' id='inputPassword' placeholder='Password'>\
	    </div>\
    </div>\
    <div class='control-group'>\
	    <div class='controls'>\
	    	<label class='checkbox'>\
	    		<input type='checkbox'> 记住我\
	    	</label>\
	    	<button type='submit' class='btn'>注册</button>\
	    </div>\
    </div>\
  </form>\
");