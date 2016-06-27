

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
	//用户名输入框的focus事件，去除警告状态
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
	//密码输入框的focus事件，去除警告状态
	$(".content-l input:eq(1)").focus(function(){
		$(this).removeClass("error").next().removeClass("error");
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
	//确认密码输入框的focus事件，去除警告状态
	$(".content-l input:eq(2)").focus(function(){
		$(this).removeClass("error").next().removeClass("error");
	});
	//验证码框blur事件,判断各种情况
	$(".content-l input:eq(3)").blur(function(){
		if ($(this).val().length==0) {
			$(this).removeClass("error").nextAll("span").removeClass("error");
		}
		else if($(this).val()==authCode){
			$(this).removeClass("error").nextAll("span").removeClass("error");
		}
		else{
			$(this).addClass("error").nextAll("span").addClass("error");
		}
	});
	//验证码框的focus事件，去除警告状态
	$(".content-l input:eq(3)").focus(function(){
		$(this).removeClass("error").nextAll("span").removeClass("error");
	});
	//checkbox按钮的blur事件
	$(".content-l [type=checkbox]").blur(function(){
		if (this.checked==true) {
			$(this).removeClass("error").next().css({"color":"#666666"});
		} else{
			
			$(this).addClass("error").next().css({"color":"#e92d2f"});
			
		}
	});
	//验证码按钮的点击事件
	//开关，用来控制发送短信
	var flag = true;
	var authCode = "";
	$(".content-l form fieldset:nth-child(4) a").on("click",function(){
		$(".content-l input:first").blur();
		if ($(".content-l input:first").hasClass("error")||$(".content-l input:first").val().length==0) {
			return false;
		}
		if (flag) {
			authCode = "";
			flag = false;
			var count = 50;
			$(this).html("<i>"+count+"</i>秒后可重新获取");
			for (var i = 0; i <6; i++) {
				authCode+=Math.round(Math.random()*9);
			}
			
			$.ajax({
				"type":"get",
				"url":"http://apis.baidu.com/kingtto_media/106sms/106sms",
				"async":true,
				"data":{"mobile":$(".content-l input:first").val(),"content":"【家有惠】验证码："+authCode+"","tag":"2"},
				"dataType":"json",
				"headers":{"apikey":"2a1534ddf549d79e069961b1b93388b5"},
				"success":function(data){
					console.log(data);
				}
			});
			var timer = setInterval(function(){
				count--;
				if (count==0) {
					clearInterval(timer);
					flag = true;
					$(".content-l form fieldset:nth-child(4) a").text("获取验证码");
					return;
				}
				$(".content-l form fieldset:nth-child(4) a i").text(count);
			},1000);
			
		}
		
	});
	//注册按钮点击事件
	$(".content-l input:eq(-1)").click(function(e){
		
		//阻止表单的默认提交行为
		e.preventDefault();
		//提交前判断一次各个输入框是否符合条件
		$(".content-l input:lt(5)").blur();
		//输入框必须不能为空，且不能为error状态
		if($(".content-l input:lt(5)").hasClass("error")==false){
			if ($(".content-l input:eq(0)").val()&&$(".content-l input:eq(1)").val()&&$(".content-l input:eq(2)").val()&&$(".content-l input:eq(3)").val()&&$(".content-l input:eq(4)").prop("checked")) {
				
				//需要存入cookie的值
				var value = {
					//下次是否自动登录
					"next":false,
					"用户名":$(".content-l input:eq(0)").val(),
					"密码":$(".content-l input:eq(1)").val(),
					"shopCar":[]
				};
				//显示遮罩层
				$(cover).show();
				var cookieArr = $.myGetCookie("user");
				if (cookieArr=="") {
					cookieArr = [value];
				} else{
					cookieArr = JSON.parse(cookieArr);
					cookieArr.unshift(value);
				}
				//将注册信息存入cookie，修改当前处于在线状态的用户
				$.mySetCookie("online",cookieArr[0]["用户名"]);
				$.mySetCookie("user",JSON.stringify(cookieArr),70*24*3600*1000);
				
				//遮罩层部分
				//显示遮罩层
				$(cover).show();
				setTimeout(function(){
					$(cover).find("i").text(2)
				},1000);
				setTimeout(function(){
					$(cover).find("i").text(1)
				},2000);
				setTimeout(function(){
					$(cover).find("i").text(0)
				},3000);
				setTimeout(function(){
					location.href = "index.html";
				},3100);
			}
		}
		
	});
})


