//验证码待做

$(function(){
	//用户名输入框的keypress事件，监测是否输入数字，拦截非数字
	$(".content-l input:first").keypress(function(e){
		if (!/\d/.test(String.fromCharCode(e.charCode))&&e.charCode>9) {
			e.preventDefault();
		}
	});
	//用户名输入框的blur事件，判断各种情况
	$(".content-l input:first").blur(function(){
		if ($(this).val().length==0) {
			$(this).removeClass("error").next().removeClass("error");
		} else if ($(this).val().length<11) {
			$(this).addClass("error").next().addClass("error");
		}
		else if(/^1\d{10}$/.test($(this).val())){
			$(this).removeClass("error").next().removeClass("error");
		}
		else{
			$(this).addClass("error").next().addClass("error");
		}
		
			
		
	});
	$(".content-l input:first").focus(function(){
		$(this).removeClass("error").next().removeClass("error");
	});
	//密码输入框的blur事件，判断各种情况
	$(".content-l input:eq(1)").blur(function(){
		if ($(this).val().length==0) {
			$(this).removeClass("error").next().removeClass("error");
		} else if ($(this).val().length<6) {
			$(this).addClass("error").next().addClass("error");
		}
		else if(/^\S{6,16}$/.test($(this).val())){
			$(this).removeClass("error").next().removeClass("error");
		}
		else{
			$(this).addClass("error").next().addClass("error");
		}
	});
	//确认密码框blur事件,判断各种情况
	$(".content-l input:eq(2)").blur(function(){
		if ($(this).val().length==0) {
			$(this).removeClass("error").next().removeClass("error");
		}else if($(this).val()===$(".content-l input:eq(1)").val()){
			$(this).removeClass("error").next().removeClass("error");
		}else{
			$(this).addClass("error").next().addClass("error");
		}
	});
	//验证码框blur事件,判断各种情况
	$(".content-l input:eq(3)").blur(function(){});
	//checkbox按钮的blur事件
	$(".content-l [type=checkbox]").blur(function(){
		if (this.checked==true) {
			$(this).removeClass("error").next().css({"color":"#666666"});
		} else{
			
			$(this).addClass("error").next().css({"color":"#e92d2f"});
			
		}
	});
	
	//注册按钮点击事件
	$(".content-l input:eq(-1)").click(function(e){
		//阻止表单的默认提交行为
		e.preventDefault();
		$(".content-l input:lt(4)").blur();
		
		if($(".content-l input:lt(4)").hasClass("error")==false){
			if ($(".content-l input:lt(4)")) {
				
			}
		}
		
	});
})


