$(function(){
	
	//登录方式切换按钮的点击事件
	$(".content-r-t span").click(function(){
		$(this).addClass("on").siblings().removeClass("on");
		$(".content-r-b form").eq($(this).index()).addClass("on").siblings().removeClass("on");
	});
	
	//用户名输入框的keypress事件，监测是否输入数字，拦截非数字
	$(".content-r-b form:first-child input:first").keypress(function(e){
		if (!/\d/.test(String.fromCharCode(e.charCode))&&e.charCode>9) {
			e.preventDefault();
		}
	});
	//用户名输入框的blur事件，判断各种情况
	$(".content-r-b form:first-child input:first").blur(function(){
		if ($(this).val().length==0) {
			$(this).removeClass("error").prev().removeClass("error");
		} else if ($(this).val().length<11) {
			$(this).addClass("error").prev().addClass("error");
		}
		else if(/^1\d{10}$/.test($(this).val())){
			$(this).removeClass("error").prev().removeClass("error");
		}
		else{
			$(this).addClass("error").prev().addClass("error");
		}
		
			
		
	});
	//用户名输入框的focus事件，去除警告状态
	$(".content-r-b form:first-child input:first").focus(function(){
		$(this).removeClass("error").prev().removeClass("error");
	});
	//密码输入框的blur事件，判断各种情况
	$(".content-r-b form:first-child input:eq(1)").blur(function(){
		if ($(this).val().length==0) {
			$(this).removeClass("error").prev().removeClass("error");
		} else if ($(this).val().length<6) {
			$(this).addClass("error").prev().addClass("error");
		}
		else if(/^\S{6,16}$/.test($(this).val())){
			$(this).removeClass("error").prev().removeClass("error");
		}
		else{
			$(this).addClass("error").prev().addClass("error");
		}
	});
	//密码输入框的focus事件，去除警告状态
	$(".content-r-b form:first-child input:eq(1)").focus(function(){
		$(this).removeClass("error").prev().removeClass("error");
	});
	//登录按钮的点击事件
	$(".content-r-b form:first-child button").click(function(e){
		e.preventDefault();
		//提交前判断一次各个输入框是否符合条件
		$(".content-r-b form:first-child input:lt(2)").blur();
		//输入框必须不能为空，且不能为error状态
		if($(".content-r-b form:first-child input:lt(2)").hasClass("error")==false){
			if ($(".content-r-b form:first-child input:eq(0)").val()&&$(".content-r-b form:first-child input:eq(1)").val()) {
				var name = $(".content-r-b form:first-child input:eq(0)").val();
				var password = $(".content-r-b form:first-child input:eq(1)").val();
				var value = $.myGetCookie("user");
				//已经有人注册
				if (value!=="") {
					value = JSON.parse(value);
					for (var i = 0; i < value.length; i++) {
						if (value[i]["用户名"]==name) {
							if (password!==value[i]["密码"]) {
								//密码错误
								$(".content-r-b form:first-child input:eq(1)").addClass("error").prev().addClass("error");
							} 
							else{
								
								if ($(".content-r-b form:first-child input:checked").length==1) {
									for (var j = 0; j < value.length; j++) {
										value[j].next = false;
									}
									value[i].next = true;
								}
								else{
									value[i].next = false;
								}
								//交换当前登录的账户和第一个账户交换
								var temp;
								temp = value[0];
								value[0] = value[i];
								value[i] = temp;
								//将注册信息存入cookie，修改当前处于在线状态的用户
								$.mySetCookie("online",value[0]["用户名"]);
								$.mySetCookie("user",JSON.stringify(value),70*24*3600*1000);
								location.href = "index.html";
								return;
							}
						}
						//账号不存在
						if (i==value.length-1) {
							$(".content-r-b form:first-child input:eq(0)").addClass("error").prev().addClass("error");
						}
					}
					
				//还没有一个人注册
				} else{
					//返回为空说明账号错误
					$(".content-r-b form:first-child input:eq(0)").addClass("error").prev().addClass("error");
				}

			}
		}
	});
});