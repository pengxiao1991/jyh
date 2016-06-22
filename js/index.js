//
$(function(){
	//二级菜单
	$(".erji").parent().hover(function(){
		$(this).find("div").show().prev().css({"background":"#DC0F50","color":"white"});
	},function(){
		$(this).find("div").hide().prev().css({"background":"#fff","color":"#333"});
	});
	//轮播图
	$.getJSON("../data/carouselBanner.json",function(data){
		
		$(".banner-b-c-t").carouselBanner({"width":714,"height":382,"srcArr":data.src,"btnWidth":30,"btnHeight":60,"srcLeftBtn":"../img/leftbtn.jpg","srcRightBtn":"../img/rightbtn.jpg","navBtnWidth":16,"navBtnHeight":16,"navBtnMargin":10,"aHref":data.href});
	});
	//onAir直播部分
	//从json中获取商品信息
	$.getJSON("../data/onAir.json",function(data){
		
		$(".onAir-b li a").each(function(index){
			
			$(this).find("img").prop({"src":data[index].src});
			$(this).find("b").text(data[index].time);
			$(this).find("p").text(data[index].description);
			$(this).find("span").text(data[index].price);
			$(this).find("i").text(data[index].oldPrice);
		});
		//克隆第一个li放到ul的最后
		$(".onAir ul li:first").clone(true).appendTo($(".onAir ul"));
	
	});
	//给onAir的按钮注册事件
	startMove("onAir");
	
	//onTimer限时抢购部分
	$.getJSON("../data/timer.json",function(data){
		
		$(".onTimer-b li a").each(function(index){
			
			$(this).find("img").prop({"src":data[index].src});
			$(this).find("b").text(data[index].discount);
			$(this).find("p").text(data[index].description);
			$(this).find("span").text(data[index].price);
			$(this).find("i").text(data[index].oldPrice);
		});
		//克隆第一个li放到ul的最后
		$(".onTimer ul li:first").clone(true).appendTo($(".onTimer ul"));
	
	});
	//给onTimer的按钮注册事件
	startMove("onTimer");
	//onTimer的倒计时
	var timeLine = setInterval(function(){
		var arr = time();
		if (arr[2]<=0) {
			clearInterval(timeLine)
			$(".onTimer-t>p span").text("00");
		} else{
			$(".onTimer-t>p span").each(function(index){
				$(this).text(arr[index]<10?"0"+arr[index]:arr[index]);
			});
		}
	},900);
	$(".onTimer-t>p span")
	//一楼部分,从json中获得热销数据
	getHotData("../data/firstHot.json","first-floor");
	//二楼部分
	getHotData("../data/firstHot.json","second-floor");
	//三楼部分
	getHotData("../data/firstHot.json","third-floor");
	//四楼部分
	getHotData("../data/firstHot.json","fourth-floor");
	//五楼部分
	getHotData("../data/firstHot.json","fifth-floor");
	//从json中获得热销数据
	function getHotData(url,className){
		$.getJSON(url,function(data){
		$.each(data, function(index,value) {
			var $li = $("."+className+" .floor-b-r li").eq(index);
			$li.find("img")[0].src = value.src;
			$li.find("p")[0].innerHTML = value.description;
			$li.find("span:last")[0].innerHTML = value.price;
		});
	});
	}
	//手风琴部分
	$.getJSON("../data/accordion.json",function(data){
		$(".floor-b-c-t").each(function(index){
			
			$(this).accordion({
				"width":580,
				"height":310,
				"left":50,
				"imgSrc":data[index+""]
			});
		});
	})
	
	
	
	
	
	
	
	
	
	
	
	
	//猜你喜欢部分
	//like猜你喜欢部分
	$.getJSON("../data/timer.json",function(data){
		
		$(".like li a").each(function(index){
			
			$(this).find("img").prop({"src":data[index].src});
			$(this).find("b").text(data[index].discount);
			$(this).find("p").text(data[index].description);
			$(this).find("span").text(data[index].price);
			$(this).find("i").text(data[index].oldPrice);
		});
		//克隆第一个li放到ul的最后
		$(".like ul li:first").clone(true).appendTo($(".like ul"));
	
	});
	//给like的按钮注册事件
	startMove("like");
	//楼梯部分
	var isClick = false;
	$(".stairs li").click(function(){
		isClick = true;
		$("html,body").animate({"scrollTop":$(".floor").eq($(this).index()).offset().top,},200,function(){
			isClick = false;
		});
	});
	$(window).on("scroll",function(){
		if ($(this).scrollTop()>=$(".floor:first").offset().top-$(this).outerHeight()/2&&$(this).scrollTop()<=$(".floor:last").offset().top+$(this).outerHeight()/2) {
			$(".stairs").show();
			if (!isClick) {
				$(".floor").each(function(index){
					if ($(window).scrollTop()>=$(this).offset().top-$(this).outerHeight()/2) {
						$(".stairs li").eq(index).addClass("on").siblings().removeClass("on");
					} 
				});
			}
			
		} 
		else{
			$(".stairs").hide();
			
		}
		
	});
	$(window).trigger("scroll");
	//图片和文字的hover特效
	$("img",".onTimer,.onAir,.like").picHover(200,200,"#fff","#dc0f50");
	$("a",".onTimer li,.onAir li,.like li").hover(function(){
		$(this).find("p").css({"color":"#dc0f50"});
	},function(){
		$(this).find("p").css({"color":"#333"});
	});
	//倒计时函数
	function time(){
		var now = Date.now();
		var end = new Date();
		end.setHours(20);
		end.setMinutes(0);
		end.setSeconds(0);
		var seconds = parseInt(((end.getTime()-now)/1000)%60);
		var minutes = parseInt(((end.getTime()-now)/1000/60)%60);
		var hours = parseInt(((end.getTime()-now)/1000/60/60));
		
		return [hours,minutes,seconds];
		
		
	}
	//小轮播图的左右按钮注册事件
	function startMove(className){
		//左右按钮的点击事件
		var count = 0;
		$("."+className+" .leftBtn").click(function(){
			
			if (count==2) {
				$("."+className+" ul").css({"left":0});
				count = 0;
				$("."+className+" ul").stop().animate({"left":-$("."+className+"-b li").innerWidth()*(++count)},200);
			} else{
				$("."+className+" ul").stop().animate({"left":-$("."+className+"-b li").innerWidth()*(++count)},200);
			}
			
		});
		$("."+className+" .rightBtn").click(function(){
			
			if (count==0) {
				$("."+className+" ul").css({"left":-$("."+className+"-b li").innerWidth()*2});
				count = 2;
				$("."+className+" ul").stop().animate({"left":-$("."+className+"-b li").innerWidth()*(--count)},200);
			} else{
				$("."+className+" ul").stop().animate({"left":-$("."+className+"-b li").innerWidth()*(--count)},200);
			}
			
		});
	}
});




































