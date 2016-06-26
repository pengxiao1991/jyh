//头部js
//需要放在cookie插件后面
(function () {
	//载入头部html结构内容
	$.ajax({
		"url":"common/header.html",
		"async":false,
		"success":function(data){
			$(header).html(data);
		}
	});
	if (location.href.search("shopCar.html")!=-1) {
		//alert(1);
		$(".header-b-r").hide();
	}
	//判断是否是登录状态online或是下次自动登录状态next，优先使用登录状态online
	var online = $.myGetCookie("online");
	//获取所有用户的信息，为一个数组
	var value = $.myGetCookie("user")===""?"":JSON.parse($.myGetCookie("user"));
	if (online!=="") {
		loadUserInfo(value[0]);
	}
	else{
		for (var i = 0; i < value.length; i++) {
			
			if (value[i].next==true&&confirm("是否使用账户："+value[i]["用户名"]+"来登录")) {
				//交换当前登录的账户和第一个账户交换
				var temp;
				temp = value[0];
				value[0] = value[i];
				value[i] = temp;
				//将注册信息存入cookie，修改当前处于在线状态的用户
				$.mySetCookie("online",value[0]["用户名"]);
				$.mySetCookie("user",JSON.stringify(value),70*24*3600*1000);
				loadUserInfo(value[0]);
				break;
			}
		}
	}
	
	
	//顶部导航的二维码的hover事件
	$("li.iphone",header).hover(function(){
		$("div.iphone",header).toggle();
	},function(){
		$("div.iphone",header).toggle();
	});
	$("li.wx",header).hover(function(){
		$("div.wx",header).toggle();
	},function(){
		$("div.wx",header).toggle();
	});
	//搜索框前的搜索类别的hover和click事件
	$(".header-b-c-t ul").hover(function(){
		$(this).find("li:last-child").show();
		
	},function(){
		$(this).find("li:last-child").hide();
	});
	$(".header-b-c-t li").click(function(){
		$(this).siblings().before($(this)).hide();
	});
	//获取热搜数据,路径是相对于html文件
	$.getJSON("../data/hotSearch.json",function(data){
		$.each(data, function(index,value) {
			//$(".header-b-c-b li a").eq(index).text(value);
			$(".header-b-c-b ul").append("<li><a href=\"javascript:;\">"+value+"</a></li>");
			
		});
	});
	//显示购物车提示框
	$(".header-b-r").hover(function(){
		$(".noGoods").show();
	},function(){
		$(".noGoods").hide();
	});
	function loadUserInfo(obj){
		var priceSum = 0;
		var numSum = 0;
		for (var i = 0; i < obj.shopCar.length; i++) {
			numSum = numSum+(obj.shopCar[i].count-0);
			priceSum = priceSum+obj.shopCar[i].count*obj.shopCar[i].price.slice(1)*100
			;
		}
		var str = "hi！ "+obj["用户名"].slice(0,3)+"****"+obj["用户名"].slice(-4);
		//改变登录的用户名显示
		$(".header-t-r ul li a").eq(1).text(str).css({"color":"#dc0f50"});
		//改变原先为的注册导航
		$(".header-t-r ul li a").eq(2).text("退出").one("click",function(e){
			e.preventDefault();
			if (obj.next) {
				obj.next = false;
				$.mySetCookie("user",JSON.stringify(value),70*24*3600*1000);
			}
			$.myRemoveCookie("online");
			location.reload();
		});
		
		//改变导航栏和搜索框购物车的提示信息
		$(".header-t-r ul li:eq(4)").css({"cursor":"pointer"}).click(function(){
			
			location.href = "../../jyh/html/shopCar.html";
		}).find("span").text(numSum);
		$(".header-b-r a span:last-child").text(numSum);
		//改变搜索框左边购物车框的提示信息
		
		//显示购物车提示框
		$(".header-b-r").hover(function(){
			if (obj.shopCar.length>0) {
				var html = "";
				
				for (var i = 0; i < obj.shopCar.length; i++) {
					
					html+="<li class=\"clear\">"
									+"<a class=\"fl clear\" href=\"javascript:;\">"
										+"<img class=\"fl\" src=\""+obj.shopCar[i].src+"\"/>"
										+"<p class=\"fl\">"+obj.shopCar[i].description+"</p>"
									+"</a>"
									+"<div class=\"fr\">"
										+"<b>"
											+"<span>"+obj.shopCar[i].price+"</span>×<i>"+obj.shopCar[i].count+"</i>"
										+"</b>"
										+"<a href=\"javscript:;\">删除</a>"
									+"</div>"
								+"</li>";
				}
				$(".goods-t ul").html(html);
				
				$(".goods-b-l span i:first").text(numSum);
				$(".goods-b-l span i:last").text("￥"+(priceSum/100).toFixed(2));
				
				$(".goods").show();
				$(".goods-t ul li div a").click(function(e){
					numSum = numSum-$(this).prev().find("i").text();
					priceSum = (priceSum)-($(this).prev().find("i").text())*($(this).prev().find("span").text()).slice(1)*100;            
					
					e.preventDefault();
					console.log(obj.shopCar);
					obj.shopCar.splice($(this).parents("li").index(),1);
					$(this).parents("li").remove();
					console.log(obj.shopCar);
					$(".header-t-r ul li:eq(4) span").text(numSum);
					$(".header-b-r a span:last-child").text(numSum);
					$(".goods-b-l span i:first").text(numSum);
					$(".goods-b-l span i:last").text(priceSum);
					if ($(".goods-t ul li div a").length==0) {
						$(".goods").hide();
						$(".noGoods").show();
					}
					
				});
				
				
			}
		},function(){
			$(".goods").hide();
		});
		
		//关闭页面前向cookie提交信息
		window.onbeforeunload = function(){
			//将所获得的最后结果存入cookie
			
			//$.mySetCookie("user",JSON.stringify(value),70*24*3600*1000);
		
		}
	}
})();








//尾部js
(function () {
	//载入头部html结构内容
	$.ajax({
		"url":"common/footer.html",
		"async":false,
		"success":function(data){
			$(footer).html(data);
		}
	});
	//右导航按钮的前两个按钮的hover事件
	$("#footer .fix a:lt(2)").hover(function(){
		$(this).find("div").show();
	},function(){
		$(this).find("div").hide();
	});
	//右导航按钮的最后一个按钮的点击事件
	$("#footer .fix a:gt(1)").click(function(){
		$("html,body").animate({"scrollTop":0},200);
	});
	//窗口的滚动条的滚动事件
	$(window).on("scroll",function(){
		if ($(this).scrollTop()<=400) {
			$("#footer .fix a:gt(1)").css({"display":"none"}).stop().animate({"opacity":0},100);
		}
		else{
			$("#footer .fix a:gt(1)").css({"display":"block"}).stop().animate({"opacity":1},100);
		}
	});
	$(window).trigger("scroll");
	
	
	
	
})()















