
$(function() {
	
	//一级菜单项的hover事件
	$(".erji").parent().hover(function() {
		$(this).find("div").show().prev().css({
			"background": "#DC0F50",
			"color": "white"
		});
	}, function() {
		$(this).find("div").hide().prev().css({
			"background": "#fff",
			"color": "#333"
		});
	});

	//轮播图
	
	$.getJSON("../data/carouselBanner.json", function(data) {

		$(".banner-b-c-t").carouselBanner({
			"width": 714,
			"height": 382,
			"srcArr": data.src,
			"btnWidth": 30,
			"btnHeight": 60,
			"srcLeftBtn": "../img/leftbtn.jpg",
			"srcRightBtn": "../img/rightbtn.jpg",
			"navBtnWidth": 16,
			"navBtnHeight": 16,
			"navBtnMargin": 10,
			"aHref": data.href
		});
	});
	//轮播图右侧部分的在有账户登录时会发生改变
	if ($(".header-t-r ul li a:eq(1)").text() !== "请登录") {
		$(".banner-b-r-t span").css({
			"marginTop": "20px"
		});
		$(".banner-b-r-t").css({
			"background": "#dc0f50",
			"marginTop": "10px"
		});
		$(".banner-b-r-t p").text($(".header-t-r ul li a:eq(1)").text()).css({
			"color": "white",
			"paddingBottom": "10px"
		});
		$(".banner-b-r-t a").remove();
		$("<div><b>待收货<br /><i>0</i></b><b>待发货<br /><i>0</i></b><b>待付款<br /><i>0</i></b></div>").appendTo(".banner-b-r-t");

		$(".banner-b-r-t div").css({
			"height": "50px",
			"background": "white",
			"padding": "14px 0 7px 0"
		}).find("b").css({
			"width": "32%",
			"height": "50px",
			"borderRight": "1px solid #e5e5e5"
		});

	}

	//onAir直播部分
	$(".onAir").jdLoad(function(){
		smallCarousel("onAir","time");
	});
	//onTimer限时抢购部分
	$(".onTimer").jdLoad(function(){
		smallCarousel("onTimer","discount");
	})

	//onTimer的倒计时
	var timeLine = setInterval(function() {
		//获取到20：00的倒计时时分秒，返回数组
		var arr = time(20);
		//如果秒数小于0，停止倒计时
		if (arr[2] < 0) {
			clearInterval(timeLine)
			$(".onTimer-t>p span").text("00");
		} else {
			$(".onTimer-t>p span").each(function(index) {
				$(this).text(arr[index] < 10 ? "0" + arr[index] : arr[index]);
			});
		}
	}, 900);
	
	//一楼部分,
	$(".first-floor").jdLoad(function(){
		
		getHotData("../data/firstHot.json","first-floor");
		createAccordion("first-floor");
		getMainData("first-floor");
		
	});
	//二楼部分
	$(".second-floor").jdLoad(function(){
		
		getHotData("../data/firstHot.json","second-floor");
		createAccordion("second-floor");
		getMainData("second-floor");
		
	});
	//三楼部分
	$(".third-floor").jdLoad(function(){
		
		getHotData("../data/firstHot.json","third-floor");
		createAccordion("third-floor");
		getMainData("third-floor");
		
	});
	//四楼部分
	$(".fourth-floor").jdLoad(function(){
		
		getHotData("../data/firstHot.json","fourth-floor");
		createAccordion("fourth-floor");
		getMainData("fourth-floor");
		
	});
	//五楼部分
	$(".fifth-floor").jdLoad(function(){
		
		getHotData("../data/firstHot.json","fifth-floor");
		createAccordion("fifth-floor");
		getMainData("fifth-floor");
		
	});
	
	//从json中获得指定楼层的热销数据
	function getHotData(url, className) {
		$.ajax({
			"type":"get",
			"url":url,
			"async":true,
			"dataType":"json",
			"success":function(data){
				//遍历通过json获得的数据，将其设置到指定类名的热销榜上
				$.each(data, function(index, value) {
					var $li = $("." + className + " .floor-b-r li").eq(index);
					$li.find("img")[0].src = value.src;
					$li.find("p")[0].innerHTML = value.description;
					$li.find("span:last")[0].innerHTML = value.price;
				});
			}	
		});	
	}
	//从json中获取指定楼层的主体信息
	function getMainData(className){
		$.ajax({
			"type":"get",
			"url":"../data/floorData.json",
			"async":true,
			"dataType":"json",
			"success":function(data){
				//通过json获得的数据，将其设置到指定类名的对应的结构上
				
				var $far = $("." + className + " .floor-b");
				$(".floor-b-l-t a img",$far).attr({"src":data[className].bannerImg[0]});
				$(".floor-b-c-b a img:first",$far).attr({"src":data[className].bannerImg[1]});
				$(".floor-b-c-b a img:eq(1)",$far).attr({"src":data[className].bannerImg[2]});
				$(".floor-b-c-b a img:last",$far).attr({"src":data[className].bannerImg[3]});
				$(".floor-b-l-b li a img",$far).each(function(index){
					$(this).attr({"src":data[className].footerImg[index]});
				});
				//隐藏加载图片
				$("." + className + " .img-load").hide();
				//显示要加载内容的html结构
				$("." + className + " .margin").show();
				
				
			},
			"beforeSend":function(){
				//动态加入加载图片，并设置居中效果
				$("<img class=\"img-load\" src=\"../img/loading.gif\"/>").insertBefore($("." + className + " .margin"));
				
				$("." + className + " .margin").prev().css({
					"width":200,
					"height":120
					
				});
				$("." + className + " .margin").prev().css({
					"margin-left": (0.5*$("." + className + " .margin").width()-$("." + className + " .margin").prev().width()/2),
					"margin-top": (0.5*$("." + className).height()-$("." + className + " .margin").prev().height()/2)
				});
				
			}
		});
	
	}
	//为对应的楼层创造手风琴
	function createAccordion(className){
		$.getJSON("../data/accordion.json", function(data) {
			$(".floor-b-c-t","."+className+"").accordion({
				"width": 580,
				"height": 310,
				"left": 50,
				"imgSrc": data[className].imgSrc,
				"aHref":data[className].aHref
			});
		
		});
	}
	
	//猜你喜欢部分
	//like猜你喜欢部分
	$(".like").jdLoad(function(){
		smallCarousel("like","discount");
	});
	
	

	//楼梯部分
	//自定义滚轮事件
//	var event = document.createEvent("MouseEvents");
//	event.initMouseEvent("mousewheel",true,true,document.defaultView,0,0,0,0,0,false,false,false,false,0,null);
//	document.onmouseup = function(){
//		document.dispatchEvent(event);
//	}
	//标志位，判断是否是点击了楼层
	var isClick = false;
	//点击楼层
	$(".stairs li").click(function() {
		
		isClick = true;
		//屏幕滚动到相应的楼层
		$("html,body").animate({
			"scrollTop": $(".floor").eq($(this).index()).offset().top,
		}, 200, function() {
			isClick = false;
			
		});
	});
	//滚动屏幕注册事件
	$(window).on("scroll", function(e) {
		
		//如果滚动到第一层前面一半高度的地方，以及滚动到最后一层后面一半高度的地方，显示楼梯
		if ($(this).scrollTop() >= $(".floor:first").offset().top - $(this).outerHeight() / 2 && $(this).scrollTop() <= $(".floor:last").offset().top + $(this).outerHeight() / 2) {
			$(".stairs").show();
			//如果不是点击楼层产生的屏幕滚动
			if (!isClick) {
				//滚动到每一层时，选中当前楼层
				$(".floor").each(function(index) {
					
					if ($(window).scrollTop() >= $(this).offset().top - $(this).outerHeight() / 2) {

						$(".stairs li").eq(index).addClass("on").siblings().removeClass("on");
					}
				});
			}

		} else {
			$(".stairs").hide();

		}

	});
	//页面加载时触发一次屏幕滚动事件，看是否显示楼层
	$(window).trigger("scroll");
	//图片的hover特效
	$("img", ".onTimer .margin,.onAir .margin,.like .margin").picHover(200, 200, "#fff", "#dc0f50", 2);
	//文字的hover特效
	$("a", ".onTimer li,.onAir li,.like li").hover(function() {
		$(this).find("p").css({
			"color": "#dc0f50"
		});
	}, function() {
		$(this).find("p").css({
			"color": "#333"
		});
	});
	//倒计时函数，得到到指定小时之前的时分秒
	function time(hour) {
		var now = Date.now();
		var end = new Date();
		end.setHours(hour);
		end.setMinutes(0);
		end.setSeconds(0);
		var seconds = parseInt(((end.getTime() - now) / 1000) % 60);
		var minutes = parseInt(((end.getTime() - now) / 1000 / 60) % 60);
		var hours = parseInt(((end.getTime() - now) / 1000 / 60 / 60));
		return [hours, minutes, seconds];

	}
	
});