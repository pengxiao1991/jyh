/*包含头部js，尾部js*/

//头部js
//需要放在cookie插件后面
//$(function(){
(function() {
	//载入头部html结构内容
	$.ajax({
		"url": "common/header.html",
		"async": false,
		"success": function(data) {
			$(header).html(data);
		}
	});
	//如果是购物车页面，就隐藏购物框
	if (location.href.search("shopCar.html") != -1) {
		//alert(1);
		$(".header-b-r").hide();
	}
	//判断是否是登录状态online或是下次自动登录状态next，优先使用登录状态online
	var online = $.myGetCookie("online");
	//获取所有用户的信息，为一个数组
	var value = $.myGetCookie("user") === "" ? "" : JSON.parse($.myGetCookie("user"));
	if (online !== "") {
		loadUserInfo(value[0]);
	} else {
		for (var i = 0; i < value.length; i++) {
			//寻找设置了下次自动登录的用户
			if (value[i].next == true && confirm("是否使用账户：" + value[i]["name"] + "来登录")) {
				//交换当前登录的账户和第一个账户交换
				var temp;
				temp = value[0];
				value[0] = value[i];
				value[i] = temp;
				//将注册信息存入cookie，修改当前处于在线状态的用户
				$.mySetCookie("online", value[0]["name"]);
				$.mySetCookie("user", JSON.stringify(value), 70 * 24 * 3600 * 1000);
				loadUserInfo(value[0]);
				break;
			}
		}
	}

	//顶部导航的二维码的hover事件
	$("li.iphone", header).hover(function() {
		$("div.iphone", header).toggle();
	}, function() {
		$("div.iphone", header).toggle();
	});
	$("li.wx", header).hover(function() {
		$("div.wx", header).toggle();
	}, function() {
		$("div.wx", header).toggle();
	});
	//搜索框前的搜索类别的hover和click事件
	$(".header-b-c-t ul").hover(function() {
		$(this).find("li:last-child").show();

	}, function() {
		$(this).find("li:last-child").hide();
	});
	$(".header-b-c-t li").click(function() {
		$(this).siblings().before($(this)).hide();
	});
	//获取搜索框下方热搜数据,路径是相对于html文件
	$.getJSON("../data/hotSearch.json", function(data) {
		$.each(data, function(index, value) {
			//$(".header-b-c-b li a").eq(index).text(value);
			$(".header-b-c-b ul").append("<li><a href=\"javascript:;\">" + value + "</a></li>");

		});
	});
	//购物车提示框无登录状态下的hover事件
	$(".header-b-r").hover(function() {
		$(".noGoods").show();
	}, function() {
		$(".noGoods").hide();
	});
	//加载用户的相关信息
	function loadUserInfo(obj) {
		//购物车内商品价格总和
		var priceSum = 0;
		//购物车内商品件数总和
		var numSum = 0;
		for (var i = 0; i < obj.shopCar.length; i++) {
			numSum = numSum + (obj.shopCar[i].count - 0);
			priceSum = priceSum + obj.shopCar[i].count * obj.shopCar[i].price.slice(1) * 100;
		}
		var str = "hi！ " + obj["name"].slice(0, 3) + "****" + obj["name"].slice(-4);
		//改变登录的用户名显示
		$(".header-t-r ul li a").eq(1).text(str).css({
			"color": "#dc0f50"
		});
		//改变原先导航的注册事件
		$(".header-t-r ul li a").eq(2).text("退出").one("click", function(e) {
			e.preventDefault();
			//改变用户下次登录为false
			if (obj.next) {
				obj.next = false;
				$.mySetCookie("user", JSON.stringify(value), 70 * 24 * 3600 * 1000);
			}
			//当前用户下线
			$.myRemoveCookie("online");
			location.reload();
		});

		//改变导航栏和搜索框购物车的提示信息
		$(".header-t-r ul li:eq(4)").css({
			"cursor": "pointer"
		}).click(function() {

			location.href = "../../jyh/html/shopCar.html";
		}).find("span").text(numSum);
		$(".header-b-r a span:last-child").text(numSum);
		//改变搜索框左边购物车框的提示信息
		//标志位，表示是否有进行过购物车的改变
		var flag = false;
		//显示购物车提示框，不会覆盖无登录状态的hover事件
		$(".header-b-r").hover(function() {
			//如果购物车内有商品，将其动态添加到购物车提示框内
			if (obj.shopCar.length > 0) {
				var html = "";

				for (var i = 0; i < obj.shopCar.length; i++) {

					html += "<li class=\"clear\">" + "<a class=\"fl clear\" href=\"javascript:;\">" + "<img class=\"fl\" src=\"" + obj.shopCar[i].src + "\"/>" + "<p class=\"fl\">" + obj.shopCar[i].description + "</p>" + "</a>" + "<div class=\"fr\">" + "<b>" + "<span>" + obj.shopCar[i].price + "</span>×<i>" + obj.shopCar[i].count + "</i>" + "</b>" + "<a href=\"javscript:;\">删除</a>" + "</div>" + "</li>";
				}
				$(".goods-t ul").html(html);
				$(".goods-b-l span i:first").text(numSum);
				$(".goods-b-l span i:last").text("￥" + (priceSum / 100).toFixed(2));
				$(".goods").show();
				//提示框内删除按钮的点击事件
				$(".goods-t ul li div a").click(function(e) {
					//改变商品数量总和和商品价格总和
					numSum = numSum - $(this).prev().find("i").text();
					priceSum = (priceSum) - ($(this).prev().find("i").text()) * ($(this).prev().find("span").text()).slice(1) * 100;

					e.preventDefault();
					//在数组中删除对应项
					flag = obj.shopCar.splice($(this).parents("li").index(), 1);
					//在购物框内删除对应项
					$(this).parents("li").remove();
					//改变导航栏和购物车框内的提示信息
					$(".header-t-r ul li:eq(4) span").text(numSum);
					$(".header-b-r a span:last-child").text(numSum);
					$(".goods-b-l span i:first").text(numSum);
					$(".goods-b-l span i:last").text(priceSum);
					//如果删光了所有数据，显示无登录状态的购物车框提示信息
					if ($(".goods-t ul li div a").length == 0) {
						$(".goods").hide();
						$(".noGoods").show();
					}

				});

			}
		}, function() {
			$(".goods").hide();
		});

		//关闭页面前向cookie提交信息
		window.onbeforeunload = function() {
			//如果有做购物车商品的改变，即删除，将所获得的最后结果存入cookie
			if (flag) {
				$.mySetCookie("user", JSON.stringify(value), 70 * 24 * 3600 * 1000);
			}

		}
	}
})();
//小轮播图封装的函数
function smallCarousel(className,type){
	$.getJSON("../data/smallCarousel.json", function(data) {

		$("."+className+" li a").each(function(index) {

			$(this).find("img").prop({
				"src": data[index].src
			});
			if (type=="discount") {
				$(this).find("b").text(data[index].discount);
			}
			else{
				$(this).find("b").text(data[index].time);
			}
			$(this).find("p").text(data[index].description);
			$(this).find("span").text(data[index].price);
			$(this).find("i").text(data[index].oldPrice);
		});
		//克隆第一个li放到ul的最后
		$("."+className+" ul li:first").clone(true).appendTo($("."+className+" ul"));

	});
	//给like的按钮注册事件
	startMove(""+className+"");
	//小轮播图的左右按钮注册事件
	function startMove(className) {
		//左右按钮的点击事件
		var count = 0;
		$("." + className + " .leftBtn").click(function() {

			if (count == 2) {
				$("." + className + " ul").css({
					"left": 0
				});
				count = 0;
				$("." + className + " ul").stop().animate({
					"left": -$("." + className + "-b li").innerWidth() * (++count)
				}, 200);
			} else {
				$("." + className + " ul").stop().animate({
					"left": -$("." + className + "-b li").innerWidth() * (++count)
				}, 200);
			}

		});
		$("." + className + " .rightBtn").click(function() {

			if (count == 0) {
				$("." + className + " ul").css({
					"left": -$("." + className + "-b li").innerWidth() * 2
				});
				count = 2;
				$("." + className + " ul").stop().animate({
					"left": -$("." + className + "-b li").innerWidth() * (--count)
				}, 200);
			} else {
				$("." + className + " ul").stop().animate({
					"left": -$("." + className + "-b li").innerWidth() * (--count)
				}, 200);
			}

		});
	}
}

//滚动到当前内容的中间部分，执行指定的函数
function loadUntil($obj,fn){
	var temp = [];
	//将传入的其他参数存储起来
	for (var i = 2; i < arguments.length; i++) {
		temp.push("'"+arguments[i]+"'");
	}
	
	var flag = true;
	$(window).on("scroll",function(){
		//如果滚动到指定对象中间
		if (($(this).scrollTop()>=$obj.offset().top-$(this).height()+$obj.outerHeight(true)/2)&&($(this).scrollTop()<=$obj.offset().top+$obj.outerHeight(true)/2)&&flag) {
			flag = false;
			eval("fn("+temp.join(",")+")");
		}
	});
}













//尾部js，当滚动到尾部是在加载
(function() {
	//载入尾部html结构内容
	$.ajax({
		"url": "common/footer.html",
		"async": false,
		"success": function(data) {
			$(footer).html(data);
		}
	});
	//右导航按钮（position:fixed）的前两个按钮的hover事件
	$("#footer .fix a:lt(2)").hover(function() {
		$(this).find("div").show();
	}, function() {
		$(this).find("div").hide();
	});
	//右导航按钮（position:fixed）的最后一个按钮的点击事件，回到顶部
	$("#footer .fix a:gt(1)").click(function() {
		$("html,body").animate({
			"scrollTop": 0
		}, 200);
	});
	//窗口的滚动条的滚动事件
	//on注册的事件不会覆盖，hover事件无法覆盖，jQuery内部调用的on
	$(window).on("scroll", function() {
		//滚动值小于400就隐藏
		if ($(this).scrollTop() <= 400) {
			$("#footer .fix a:gt(1)").css({
				"display": "none"
			}).stop().animate({
				"opacity": 0
			}, 100);
		} else {
			$("#footer .fix a:gt(1)").css({
				"display": "block"
			}).stop().animate({
				"opacity": 1
			}, 100);
		}
	});
	//加载页面时先调用一次，看看是否应该显示回到顶部按钮
	$(window).trigger("scroll");
		
	
	

})();
//});