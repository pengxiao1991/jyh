$(function() {
	//获取所有用户信息，为一个字符串
	var cookieArr = $.myGetCookie("user");
	//用户名输入框的keypress事件，监测是否输入数字，拦截非数字
	$(".content-l input:first").keypress(function(e) {
		//屏蔽非数字键&&屏蔽键码大于9的键（就是保留上下，退格，删除键）&&保留ctrl键
		if (!/\d/.test(String.fromCharCode(e.charCode)) && e.charCode > 9) {
			e.preventDefault();
		}
	});
	//用户名输入框的blur事件，判断各种情况
	$(".content-l input:first").blur(function() {
		//如果输入框为空，还原样式
		if ($(this).val().length == 0) {

			$(this).removeClass("error").next().removeClass("error");
			//如果长度小于11，弹出警告
		} else if ($(this).val().length < 11) {
			$(this).addClass("error").next().addClass("error");
		}
		//如果符合正则，还原样式
		else if (/^((13[0-9])|(15[^4,\D])|(18[0,5-9]))\d{8}$/.test($(this).val())) {
			if (cookieArr != "") {
				var temp = JSON.parse(cookieArr);
				for (var i = 0; i < temp.length; i++) {
					if (temp[i]["name"] == $(this).val()) {
						alert("用户名已存在");
						$(this).addClass("error").next().addClass("error");
						return;
					}
				}
			}
			$(this).removeClass("error").next().removeClass("error");

		} else {
			$(this).addClass("error").next().addClass("error");
		}

	});
	//用户名输入框的focus事件，去除警告状态
	$(".content-l input:first").focus(function() {
		$(this).removeClass("error").next().removeClass("error");
	});
	//密码输入框的blur事件，判断各种情况
	$(".content-l input:eq(1)").blur(function() {
		//如果输入框为空，还原样式
		if ($(this).val().length == 0) {
			$(this).removeClass("error").next().removeClass("error");
			//如果长度小于6，弹出警告
		} else if ($(this).val().length < 6) {
			$(this).addClass("error").next().addClass("error");
		}
		//如果符合正则，还原样式
		else if (/^\S{6,16}$/.test($(this).val())) {
			$(this).removeClass("error").next().removeClass("error");
		} else {
			$(this).addClass("error").next().addClass("error");
		}
	});
	//密码输入框的focus事件，去除警告状态
	$(".content-l input:eq(1)").focus(function() {
		$(this).removeClass("error").next().removeClass("error");
	});
	//确认密码框blur事件,判断各种情况
	$(".content-l input:eq(2)").blur(function() {
		//如果输入框为空，还原样式
		if ($(this).val().length == 0) {
			$(this).removeClass("error").next().removeClass("error");
			//如果输入的字符串和密码框的字符串相同
		} else if ($(this).val() === $(".content-l input:eq(1)").val()) {
			$(this).removeClass("error").next().removeClass("error");
		} else {
			$(this).addClass("error").next().addClass("error");
		}
	});
	//确认密码输入框的focus事件，去除警告状态
	$(".content-l input:eq(2)").focus(function() {
		$(this).removeClass("error").next().removeClass("error");
	});
	//验证码框blur事件,判断各种情况
	$(".content-l input:eq(3)").blur(function() {
		//如果输入框为空，还原样式
		if ($(this).val().length == 0) {
			$(this).removeClass("error").nextAll("span").removeClass("error");
		}
		//如果输入的字符串和随机生成的字符串相等，还原样式
		else if ($(this).val() == authCode) {
			$(this).removeClass("error").nextAll("span").removeClass("error");
		} else {
			$(this).addClass("error").nextAll("span").addClass("error");
		}
	});
	//验证码框的focus事件，去除警告状态
	$(".content-l input:eq(3)").focus(function() {
		$(this).removeClass("error").nextAll("span").removeClass("error");
	});
	//checkbox按钮的blur事件
	$(".content-l [type=checkbox]").blur(function() {
		//如果checkbox被选中
		if (this.checked == true) {
			$(this).removeClass("error").next().css({
				"color": "#666666"
			});
		} else {

			$(this).addClass("error").next().css({
				"color": "#e92d2f"
			});

		}
	});
	//验证码按钮的点击事件
	//开关，用来控制发送短信
	var flag = true;
	//用来存储生成的随机字符串
	var authCode = "";
	$(".content-l form fieldset:nth-child(4) a").on("click", function() {
		//验证手机号的输入
		$(".content-l input:first").blur();
		//如果手机号错误或者为空
		if ($(".content-l input:first").hasClass("error") || $(".content-l input:first").val().length == 0) {
			return false;
		}
		if (flag) {
			//清空原来生成的字符串
			authCode = "";
			//关闭开关
			flag = false;
			//封锁短信发送功能的时间
			var count = 50;
			$(this).html("<i>" + count + "</i>秒后可重新获取");
			//生成随机字符串
			for (var i = 0; i < 6; i++) {
				authCode += Math.round(Math.random() * 9);
			}
			//利用第三方接口发送短信
			$.ajax({
				"type": "get",
				"url": "http://apis.baidu.com/kingtto_media/106sms/106sms",
				"async": true,
				"data": JSON.stringify({
					"mobile": $(".content-l input:first").val(),
					"content": "【家有惠】验证码：" + authCode + "",
					"tag": 2
				}),
				"dataType": "json",
				"headers": {
					"apikey": "2a1534ddf549d79e069961b1b93388b5"
				},
				"complete": function(data) {
					console.log(data.responseText);
				}
			});
			//定时器，为了防止多次连续发送短信
			var timer = setInterval(function() {
				count--;
				if (count == 0) {
					clearInterval(timer);
					//打开开关
					flag = true;
					$(".content-l form fieldset:nth-child(4) a").text("获取验证码");
					return;
				}
				$(".content-l form fieldset:nth-child(4) a i").text(count);
			}, 1000);

		}

	});
	//注册按钮点击事件
	$(".content-l input:eq(-1)").click(function(e) {

		//阻止表单的默认提交行为
		e.preventDefault();
		//提交前判断一次各个输入框是否符合条件
		$(".content-l input:lt(5)").blur();
		//输入框必须不能为空，且不能为error状态
		if ($(".content-l input:lt(5)").hasClass("error") == false) {
			if ($(".content-l input:eq(0)").val() && $(".content-l input:eq(1)").val() && $(".content-l input:eq(2)").val() && $(".content-l input:eq(3)").val() && $(".content-l input:eq(4)").prop("checked")) {

				//需要存入cookie的值
				var value = {
					//下次是否自动登录
					"next": false,
					"name": $(".content-l input:eq(0)").val(),
					"password": $(".content-l input:eq(1)").val(),
					"shopCar":[],
					"order":[]
				};

				if (cookieArr == "") {
					cookieArr = [value];
				} else {
					cookieArr = JSON.parse(cookieArr);

					cookieArr.unshift(value);
				}
				//将注册信息存入cookie，修改当前处于在线状态的用户
				$.mySetCookie("online", cookieArr[0]["name"]);
				$.mySetCookie("user", JSON.stringify(cookieArr), 70 * 24 * 3600 * 1000);

				//遮罩层部分
				//显示遮罩层
				$(cover).show();
				//倒计时
				setTimeout(function() {
					$(cover).find("i").text(2)
				}, 1000);
				setTimeout(function() {
					$(cover).find("i").text(1)
				}, 2000);
//				setTimeout(function() {
//					$(cover).find("i").text(0)
//				}, 3000);
				setTimeout(function() {
					location.href = "index.html";
				}, 3000);
			}
		}

	});
})